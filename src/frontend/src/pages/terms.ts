import { renderPageFooter } from "../components/footer";
import { showNavbar } from "../components/navbar";

export function renderTermsPage(): void {
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
        <h1 style="font-size:30px;font-weight:700;color:#202124;margin-bottom:8px">Terms of Service</h1>
        <p style="font-size:13px;color:#9aa0a6;margin-bottom:36px">Last updated: March 2026</p>
        ${[
          [
            "1. Acceptance of Terms",
            "By accessing or using Dhoondho.App, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.",
          ],
          [
            "2. Use of the Service",
            "Dhoondho.App provides a platform for discovering and listing local businesses in India. You agree to use the service only for lawful purposes and in accordance with these terms. You must not misuse or attempt to disrupt the service.",
          ],
          [
            "3. User Accounts",
            "To list a business or access vendor features, you must authenticate. You are responsible for maintaining the confidentiality of your account and all activities that occur under it.",
          ],
          [
            "4. Business Listings",
            "Business owners are responsible for the accuracy of information submitted in their listings. Dhoondho reserves the right to review, modify, or remove any listing that violates our policies or is deemed inappropriate.",
          ],
          [
            "5. Intellectual Property",
            "All content, trademarks, logos, and branding on Dhoondho.App are the property of Dhoondho. You may not reproduce or use them without prior written consent.",
          ],
          [
            "6. Disclaimer of Warranties",
            "Dhoondho.App is provided 'as is' without any warranties, express or implied. We do not guarantee the accuracy, completeness, or availability of any listing or information.",
          ],
          [
            "7. Limitation of Liability",
            "Dhoondho shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.",
          ],
          [
            "8. Modifications",
            "We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.",
          ],
          [
            "9. Governing Law",
            "These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in India.",
          ],
          [
            "10. Contact",
            "For any questions about these Terms, please contact us via the Support page.",
          ],
        ]
          .map(
            ([title, content]) => `
          <div style="margin-bottom:28px">
            <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:8px">${title}</h2>
            <p style="font-size:15px;line-height:1.7;color:#3c4043">${content}</p>
          </div>
        `,
          )
          .join("")}
      </div>
      ${renderPageFooter(main)}
    </div>
  `;
}
