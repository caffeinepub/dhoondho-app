import { renderPageFooter } from "../components/footer";
import { showNavbar } from "../components/navbar";

export function renderSupportPage(): void {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  main.innerHTML = `
    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">
      <div style="max-width:800px;margin:0 auto;padding:48px 24px;flex:1">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>Back to Home</a>

        <h1 style="font-size:30px;font-weight:700;color:#202124;margin-bottom:8px">Support Center</h1>
        <p style="font-size:15px;color:#5f6368;margin-bottom:40px">We're here to help. Find answers or get in touch with our team.</p>

        <!-- Quick links -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-bottom:48px">
          ${[
            {
              icon: "🏢",
              title: "List Your Business",
              desc: "Add or manage your business listing",
              link: "#/vendor",
            },
            {
              icon: "🔍",
              title: "Search Help",
              desc: "Tips for finding businesses near you",
              link: "#/",
            },
            {
              icon: "📜",
              title: "Terms of Service",
              desc: "Read our terms and conditions",
              link: "#/terms",
            },
            {
              icon: "🔒",
              title: "Privacy Policy",
              desc: "How we protect your data",
              link: "#/privacy",
            },
          ]
            .map(
              (item) => `
            <a href="${item.link}" style="display:block;padding:20px;border:1px solid #e8eaed;border-radius:12px;text-decoration:none;transition:box-shadow 0.15s" onmouseenter="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'" onmouseleave="this.style.boxShadow=''">
              <div style="font-size:24px;margin-bottom:8px">${item.icon}</div>
              <div style="font-size:14px;font-weight:700;color:#202124;margin-bottom:4px">${item.title}</div>
              <div style="font-size:12px;color:#5f6368">${item.desc}</div>
            </a>
          `,
            )
            .join("")}
        </div>

        <!-- FAQ -->
        <h2 style="font-size:22px;font-weight:700;color:#202124;margin-bottom:20px">Frequently Asked Questions</h2>
        <div style="border:1px solid #e8eaed;border-radius:12px;overflow:hidden;margin-bottom:40px">
          ${[
            [
              "How do I list my business on Dhoondho?",
              "Click on 'For Businesses' in the navigation, sign in with your account, and use the 'Add Business' button to submit your listing. Our team reviews and approves listings within 24 hours.",
            ],
            [
              "Is listing my business free?",
              "Yes! Listing your business on Dhoondho is completely free. We believe every business in India deserves to be discoverable.",
            ],
            [
              "How does Nearby Now work?",
              "Nearby Now uses your device's GPS location (with your permission) to instantly show businesses within your area. Simply click the green 'Nearby Now' button and allow location access.",
            ],
            [
              "How long does it take for my listing to be approved?",
              "Listings are typically reviewed and approved within 24-48 hours. You'll be able to see the status in your Vendor Dashboard.",
            ],
            [
              "Can I update my business information?",
              "Yes. Log in to your Vendor Dashboard and you can update your listing details at any time.",
            ],
            [
              "How do I report an incorrect listing?",
              "Use the 'Contact Us' section below to report incorrect or fraudulent listings. Our team will investigate and take action promptly.",
            ],
          ]
            .map(
              ([q, a], i) => `
            <div style="padding:18px 20px;${i > 0 ? "border-top:1px solid #e8eaed" : ""}">
              <div style="font-size:14px;font-weight:700;color:#202124;margin-bottom:6px">${q}</div>
              <div style="font-size:14px;color:#5f6368;line-height:1.6">${a}</div>
            </div>
          `,
            )
            .join("")}
        </div>

        <!-- Contact form -->
        <h2 style="font-size:22px;font-weight:700;color:#202124;margin-bottom:20px">Contact Us</h2>
        <div style="background:#f8f9fa;border-radius:16px;padding:28px">
          <form id="support-form">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
              <div>
                <label style="display:block;font-size:13px;font-weight:600;color:#202124;margin-bottom:6px">Name *</label>
                <input type="text" required placeholder="Your name" style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:8px;font-size:14px;outline:none;box-sizing:border-box" />
              </div>
              <div>
                <label style="display:block;font-size:13px;font-weight:600;color:#202124;margin-bottom:6px">Email *</label>
                <input type="email" required placeholder="your@email.com" style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:8px;font-size:14px;outline:none;box-sizing:border-box" />
              </div>
            </div>
            <div style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#202124;margin-bottom:6px">Subject *</label>
              <select required style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:8px;font-size:14px;outline:none;background:#fff;box-sizing:border-box">
                <option value="">Select a topic</option>
                <option>Listing Issue</option>
                <option>Account Help</option>
                <option>Report Incorrect Information</option>
                <option>Partnership Inquiry</option>
                <option>Technical Problem</option>
                <option>Other</option>
              </select>
            </div>
            <div style="margin-bottom:20px">
              <label style="display:block;font-size:13px;font-weight:600;color:#202124;margin-bottom:6px">Message *</label>
              <textarea required rows="5" placeholder="Describe your issue or question..." style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:8px;font-size:14px;outline:none;resize:vertical;box-sizing:border-box"></textarea>
            </div>
            <button type="submit" id="support-submit" style="padding:12px 28px;background:#1a7a3c;color:#fff;border:none;border-radius:24px;font-size:14px;font-weight:700;cursor:pointer">Send Message</button>
            <div id="support-msg" style="display:none;margin-top:14px;padding:12px 16px;border-radius:8px;font-size:14px"></div>
          </form>
        </div>

        <div style="margin-top:32px;text-align:center;padding-top:24px;border-top:1px solid #e8eaed">
          <p style="font-size:13px;color:#9aa0a6">Email: <a href="mailto:support@dhoondho.app" style="color:#1a73e8;text-decoration:none">support@dhoondho.app</a></p>
        </div>
      </div>
      ${renderPageFooter(main)}
    </div>
  `;

  // Form submit handler
  document.getElementById("support-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = document.getElementById("support-submit") as HTMLButtonElement;
    const msg = document.getElementById("support-msg");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending...";
    }
    setTimeout(() => {
      if (msg) {
        msg.style.display = "block";
        msg.style.background = "#e8f5e9";
        msg.style.color = "#1a7a3c";
        msg.textContent =
          "✓ Message sent! Our team will get back to you within 24-48 hours.";
      }
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Send Message";
      }
      (document.getElementById("support-form") as HTMLFormElement)?.reset();
    }, 1200);
  });
}
