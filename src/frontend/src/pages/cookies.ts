import { renderPageFooter } from "../components/footer";
import { showNavbar } from "../components/navbar";

export function renderCookiesPage(): void {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  main.innerHTML = `
    <style>
      @media (max-width: 600px) { .legal-container { padding: 24px 16px !important; } }
    </style>
    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">
      <div class="legal-container" style="max-width:800px;margin:0 auto;padding:48px 24px;flex:1">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>Back to Home</a>
        <h1 style="font-size:30px;font-weight:700;color:#202124;margin-bottom:8px">Cookie Policy</h1>
        <p style="font-size:13px;color:#9aa0a6;margin-bottom:36px">Last updated: March 2026</p>

        <p style="font-size:15px;line-height:1.7;color:#3c4043;margin-bottom:32px">This Cookie Policy explains how Dhoondho.App uses cookies and similar technologies when you visit our platform.</p>

        <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:12px">What Are Cookies?</h2>
        <p style="font-size:15px;line-height:1.7;color:#3c4043;margin-bottom:28px">Cookies are small text files stored on your device by your browser when you visit a website. They help websites remember your preferences and improve your experience.</p>

        <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:16px">Types of Cookies We Use</h2>
        <div style="border:1px solid #e8eaed;border-radius:12px;overflow:hidden;margin-bottom:28px">
          ${[
            {
              type: "Essential Cookies",
              purpose:
                "Required for the platform to function. Includes authentication session data.",
              required: true,
            },
            {
              type: "Preference Cookies",
              purpose:
                "Remember your language preferences and search settings.",
              required: false,
            },
            {
              type: "Analytics Cookies",
              purpose:
                "Help us understand how users interact with Dhoondho to improve the experience. All data is anonymized.",
              required: false,
            },
          ]
            .map(
              (row, i) => `
            <div style="padding:16px 20px;${i > 0 ? "border-top:1px solid #e8eaed" : ""}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
                <div>
                  <div style="font-size:14px;font-weight:700;color:#202124;margin-bottom:4px">${row.type}</div>
                  <div style="font-size:13px;color:#5f6368;line-height:1.5">${row.purpose}</div>
                </div>
                <span style="font-size:11px;font-weight:600;padding:3px 10px;border-radius:12px;white-space:nowrap;${row.required ? "background:#e8f5e9;color:#1a7a3c" : "background:#f8f9fa;color:#5f6368"}">${row.required ? "Required" : "Optional"}</span>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>

        <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:12px">Managing Cookies</h2>
        <p style="font-size:15px;line-height:1.7;color:#3c4043;margin-bottom:16px">You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, disabling essential cookies may affect platform functionality.</p>

        <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:12px;margin-top:28px">Contact</h2>
        <p style="font-size:15px;line-height:1.7;color:#3c4043">For any cookie-related questions, please visit our <a href="#/support" style="color:#1a73e8;text-decoration:none">Support page</a>.</p>
      </div>
      ${renderPageFooter(main)}
    </div>
  `;
}
