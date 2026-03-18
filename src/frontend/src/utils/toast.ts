// Toast notification utility for Dhoondho.App

let toastContainer: HTMLElement | null = null;

function getOrCreateContainer(): HTMLElement {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement("div");
    toastContainer.id = "dhoondho-toast-container";
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(
  message: string,
  type: "success" | "error" | "info" = "success",
  duration = 3000,
): void {
  const container = getOrCreateContainer();

  const colors: Record<
    string,
    { bg: string; color: string; border: string; icon: string }
  > = {
    success: { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0", icon: "✓" },
    error: { bg: "#fef2f2", color: "#991b1b", border: "#fecaca", icon: "✕" },
    info: { bg: "#eff6ff", color: "#1e40af", border: "#bfdbfe", icon: "ℹ" },
  };
  const c = colors[type];

  const toast = document.createElement("div");
  toast.setAttribute("data-ocid", `toast.${type}`);
  toast.style.cssText = `
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border-radius: 12px;
    border: 1px solid ${c.border};
    background: ${c.bg};
    color: ${c.color};
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    min-width: 220px;
    max-width: 340px;
    pointer-events: all;
    transform: translateX(120%);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: default;
    user-select: none;
  `;

  toast.innerHTML = `
    <span style="width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;background:${c.color};color:#fff;flex-shrink:0">${c.icon}</span>
    <span style="flex:1;line-height:1.4">${message}</span>
  `;

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = "translateX(0)";
    });
  });

  // Auto-dismiss
  const timer = setTimeout(() => {
    toast.style.transform = "translateX(120%)";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  }, duration);

  // Click to dismiss
  toast.addEventListener("click", () => {
    clearTimeout(timer);
    toast.style.transform = "translateX(120%)";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  });
}
