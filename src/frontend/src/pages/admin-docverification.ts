// ─── Document Verification Module ────────────────────────────────────────────────

export interface DocumentSubmission {
  id: string;
  vendorName: string;
  businessName: string;
  docType: "gst" | "pan" | "aadhaar" | "business_reg" | "fssai" | "other";
  fileName: string;
  fileSize: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  reviewNote?: string;
}

const DOCS_KEY = "dhoondho_doc_submissions";

export function getDocSubmissions(): DocumentSubmission[] {
  try {
    return JSON.parse(localStorage.getItem(DOCS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addDocSubmission(
  doc: Omit<DocumentSubmission, "id" | "submittedAt" | "status">,
): void {
  const all = getDocSubmissions();
  all.unshift({
    ...doc,
    id: `doc-${Date.now()}`,
    submittedAt: new Date().toISOString().split("T")[0],
    status: "pending",
  });
  localStorage.setItem(DOCS_KEY, JSON.stringify(all));
}

function saveDocs(docs: DocumentSubmission[]): void {
  localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
}

function initDemoDocs(): void {
  if (getDocSubmissions().length > 0) return;
  const demo: DocumentSubmission[] = [
    {
      id: "d1",
      vendorName: "Priya Verma",
      businessName: "Priya Beauty Salon",
      docType: "gst",
      fileName: "GST_Certificate.pdf",
      fileSize: "2.1 MB",
      status: "pending",
      submittedAt: "2026-03-18",
    },
    {
      id: "d2",
      vendorName: "Amit Patel",
      businessName: "Amit Plumbing Works",
      docType: "pan",
      fileName: "PAN_Card_Amit.jpg",
      fileSize: "0.8 MB",
      status: "pending",
      submittedAt: "2026-03-17",
    },
    {
      id: "d3",
      vendorName: "Rahul Sharma",
      businessName: "Sharma Electricals",
      docType: "business_reg",
      fileName: "Business_Registration.pdf",
      fileSize: "3.5 MB",
      status: "approved",
      submittedAt: "2026-03-10",
      reviewedAt: "2026-03-12",
      reviewNote: "All documents verified successfully.",
    },
    {
      id: "d4",
      vendorName: "Sunita Rao",
      businessName: "Sunita Catering",
      docType: "fssai",
      fileName: "FSSAI_License.pdf",
      fileSize: "1.2 MB",
      status: "rejected",
      submittedAt: "2026-03-08",
      reviewedAt: "2026-03-09",
      reviewNote:
        "FSSAI license appears expired. Please submit a valid license.",
    },
    {
      id: "d5",
      vendorName: "Vikram Singh",
      businessName: "Vikram Auto Repair",
      docType: "aadhaar",
      fileName: "Aadhaar_Vikram.jpg",
      fileSize: "1.5 MB",
      status: "pending",
      submittedAt: "2026-03-19",
    },
  ];
  saveDocs(demo);
}

const DOC_TYPE_LABELS: Record<DocumentSubmission["docType"], string> = {
  gst: "GST Certificate",
  pan: "PAN Card",
  aadhaar: "Aadhaar Card",
  business_reg: "Business Registration",
  fssai: "FSSAI License",
  other: "Other Document",
};

function statusBadge(s: DocumentSubmission["status"]): string {
  const m: Record<DocumentSubmission["status"], string> = {
    pending: "background:#fff3e0;color:#e65100",
    approved: "background:#e8f5e9;color:#1a7a3c",
    rejected: "background:#fdecea;color:#b71c1c",
  };
  const icons: Record<DocumentSubmission["status"], string> = {
    pending: "⏳",
    approved: "✅",
    rejected: "❌",
  };
  return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="${m[s]}">${icons[s]} ${s}</span>`;
}

export function renderDocVerificationTab(container: HTMLElement): void {
  initDemoDocs();
  const docs = getDocSubmissions();
  const pending = docs.filter((d) => d.status === "pending").length;
  const approved = docs.filter((d) => d.status === "approved").length;
  const rejected = docs.filter((d) => d.status === "rejected").length;

  container.innerHTML = `
    <div class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Document Verification</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${pending} pending review · ${approved} approved · ${rejected} rejected</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
          { label: "Total", val: docs.length, color: "oklch(var(--primary))" },
          { label: "Pending", val: pending, color: "#e65100" },
          { label: "Approved", val: approved, color: "#1a7a3c" },
          { label: "Rejected", val: rejected, color: "#b71c1c" },
        ]
          .map(
            (
              s,
            ) => `<div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:${s.color}">${s.val}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${s.label}</div>
        </div>`,
          )
          .join("")}
      </div>

      <!-- Filter -->
      <div class="flex flex-wrap gap-3">
        <select id="doc-status-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select id="doc-type-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Types</option>
          <option value="gst">GST Certificate</option>
          <option value="pan">PAN Card</option>
          <option value="aadhaar">Aadhaar</option>
          <option value="business_reg">Business Reg.</option>
          <option value="fssai">FSSAI License</option>
        </select>
      </div>

      <!-- Document Cards -->
      <div id="docs-list" class="space-y-3">
        ${renderDocCards(docs)}
      </div>
    </div>
  `;

  const statusFilter =
    container.querySelector<HTMLSelectElement>("#doc-status-filter");
  const typeFilter =
    container.querySelector<HTMLSelectElement>("#doc-type-filter");

  function applyFilters(): void {
    const status = statusFilter?.value || "";
    const type = typeFilter?.value || "";
    const filtered = getDocSubmissions().filter(
      (d) => (!status || d.status === status) && (!type || d.docType === type),
    );
    const list = container.querySelector("#docs-list");
    if (list) list.innerHTML = renderDocCards(filtered);
    attachDocActions(container);
  }

  statusFilter?.addEventListener("change", applyFilters);
  typeFilter?.addEventListener("change", applyFilters);
  attachDocActions(container);
}

function renderDocCards(docs: DocumentSubmission[]): string {
  if (docs.length === 0)
    return `<div class="p-10 text-center text-sm" style="color:oklch(var(--muted-foreground))">No documents found.</div>`;
  return docs
    .map(
      (d) => `
    <div class="rounded-xl border p-4 sm:p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))" data-doc-id="${d.id}">
      <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-lg">📄</span>
            <div>
              <h3 class="text-sm font-bold" style="color:oklch(var(--foreground))">${d.fileName}</h3>
              <p class="text-xs" style="color:oklch(var(--muted-foreground))">${DOC_TYPE_LABELS[d.docType]} · ${d.fileSize}</p>
            </div>
          </div>
        </div>
        ${statusBadge(d.status)}
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 text-xs" style="color:oklch(var(--muted-foreground))">
        <div><span class="font-semibold">Vendor:</span> ${d.vendorName}</div>
        <div><span class="font-semibold">Business:</span> ${d.businessName}</div>
        <div><span class="font-semibold">Submitted:</span> ${d.submittedAt}</div>
      </div>
      ${d.reviewNote ? `<div class="mb-3 p-3 rounded-lg text-xs" style="background:${d.status === "approved" ? "#e8f5e9" : "#fdecea"};color:${d.status === "approved" ? "#1a7a3c" : "#b71c1c"}"><span class="font-semibold">Review Note:</span> ${d.reviewNote}</div>` : ""}
      ${
        d.status === "pending"
          ? `
        <div class="space-y-2">
          <textarea id="review-note-${d.id}" rows="2" placeholder="Optional review note..." class="w-full px-3 py-2 rounded-lg border text-xs resize-none" style="border-color:oklch(var(--border))"></textarea>
          <div class="flex gap-2 flex-wrap">
            <button class="doc-action text-xs px-4 py-2 rounded-lg font-bold text-white" data-action="approve" data-id="${d.id}" style="background:#1a7a3c">✓ Approve</button>
            <button class="doc-action text-xs px-4 py-2 rounded-lg font-bold" data-action="reject" data-id="${d.id}" style="background:#fdecea;color:#b71c1c">× Reject</button>
          </div>
        </div>
      `
          : ""
      }
    </div>
  `,
    )
    .join("");
}

function attachDocActions(container: HTMLElement): void {
  for (const btn of Array.from(
    container.querySelectorAll<HTMLElement>(".doc-action"),
  )) {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      const docs = getDocSubmissions();
      const idx = docs.findIndex((d) => d.id === id);
      if (idx === -1) return;
      const note = (
        container.querySelector<HTMLTextAreaElement>(`#review-note-${id}`)
          ?.value || ""
      ).trim();
      docs[idx].status = action === "approve" ? "approved" : "rejected";
      docs[idx].reviewedAt = new Date().toISOString().split("T")[0];
      if (note) docs[idx].reviewNote = note;
      saveDocs(docs);
      const list = container.querySelector("#docs-list");
      if (list) list.innerHTML = renderDocCards(getDocSubmissions());
      attachDocActions(container);
      showDocToast(
        action === "approve" ? "Document approved!" : "Document rejected.",
      );
    });
  }
}

function showDocToast(msg: string): void {
  const t = document.createElement("div");
  t.className =
    "fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg";
  t.style.background = "oklch(var(--primary))";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
