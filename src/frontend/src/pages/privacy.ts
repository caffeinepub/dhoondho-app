import { renderPageFooter } from "../components/footer";
import { showNavbar } from "../components/navbar";

export function renderPrivacyPage(): void {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  main.innerHTML = `
    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">
      <div style="max-width:800px;margin:0 auto;padding:48px 24px;flex:1">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>Back to Home</a>
        <h1 style="font-size:30px;font-weight:700;color:#202124;margin-bottom:8px">Privacy Policy</h1>
        <p style="font-size:13px;color:#9aa0a6;margin-bottom:36px">Last updated: March 2026</p>
        ${[
          [
            "Information We Collect",
            "We collect information you provide when registering a business listing (name, business name, phone number, address). We also collect usage data such as search queries, city searches, and GPS-based searches (only when you grant permission).",
          ],
          [
            "How We Use Your Information",
            "We use your information to: display your business listing to users, improve search relevance and recommendations, communicate service updates, and ensure platform security and integrity.",
          ],
          [
            "Location Data",
            'Location (GPS) data is only collected when you explicitly grant permission by clicking "Nearby Now". This data is used solely to find businesses near you and is not stored or shared with third parties.',
          ],
          [
            "Sharing of Information",
            "Your business listing information (name, address, phone, description) is publicly visible on Dhoondho.App. We do not sell personal data to third parties. We may share data with service providers who help operate the platform, under strict confidentiality agreements.",
          ],
          [
            "Data Security",
            "We implement industry-standard security measures to protect your data. All data is stored on decentralized infrastructure, reducing single points of failure.",
          ],
          [
            "Your Rights",
            "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us through the Support page. Business listings can be managed directly from your vendor dashboard.",
          ],
          [
            "Cookies",
            "We use essential cookies to operate the platform. See our Cookie Policy for more details.",
          ],
          [
            "Changes to This Policy",
            "We may update this policy periodically. Changes will be posted on this page with an updated date. Continued use of the service constitutes acceptance.",
          ],
          [
            "Contact Us",
            "If you have privacy concerns, please contact us via the Support page or email us at privacy@dhoondho.app.",
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
