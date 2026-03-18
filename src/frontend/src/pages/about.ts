import { renderPageFooter } from "../components/footer";
import { showNavbar } from "../components/navbar";

export function renderAboutPage(): void {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;

  main.innerHTML = `
    <style>
      @media (max-width: 600px) {
        .about-container { padding: 24px 16px !important; }
        .about-logo-text { font-size: clamp(32px, 9vw, 52px) !important; }
        .about-cta { display: block; text-align: center; }
      }
    </style>
    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">
      <div class="about-container" style="max-width:800px;margin:0 auto;padding:48px 24px;flex:1">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>

        <!-- Logo -->
        <div style="text-align:center;margin-bottom:40px">
          <div class="about-logo-text" style="font-size:clamp(32px, 9vw, 52px);font-weight:700;letter-spacing:-2px;line-height:1">
            <span style="color:#EA4335">D</span><span style="color:#4285F4">h</span><span style="color:#FBBC05">o</span><span style="color:#34A853">o</span><span style="color:#EA4335">n</span><span style="color:#4285F4">d</span><span style="color:#FBBC05">h</span><span style="color:#34A853">o</span>
          </div>
          <p style="font-size:16px;color:#5f6368;margin-top:6px">India's First Local Search Engine</p>
        </div>

        <h1 style="font-size:28px;font-weight:700;color:#202124;margin-bottom:16px">About Dhoondho.App</h1>

        <p style="font-size:16px;line-height:1.7;color:#3c4043;margin-bottom:24px">
          <strong>Dhoondho</strong> (meaning "Search" in Hindi) is India's first hyperlocal search engine built specifically for discovering local businesses, services, and professionals across every city, town, and village in India.
        </p>

        <p style="font-size:16px;line-height:1.7;color:#3c4043;margin-bottom:24px">
          Whether you're looking for a plumber in Mumbai, a restaurant in Delhi, a doctor in Bangalore, or any other local service -- Dhoondho connects you with trusted businesses near you, powered by real-time GPS and city-based search.
        </p>

        <h2 style="font-size:20px;font-weight:700;color:#202124;margin-bottom:12px;margin-top:36px">Our Mission</h2>
        <p style="font-size:16px;line-height:1.7;color:#3c4043;margin-bottom:24px">
          To digitize India's 63 million micro, small, and medium businesses and make them discoverable to over 1.4 billion Indians -- starting from the biggest metro to the smallest town.
        </p>

        <h2 style="font-size:20px;font-weight:700;color:#202124;margin-bottom:12px;margin-top:36px">What We Offer</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;margin-bottom:32px">
          ${[
            {
              icon: "🔍",
              title: "Smart Search",
              desc: "Search by city, category, or GPS location with filters and sorting.",
            },
            {
              icon: "🗺️",
              title: "Interactive Map",
              desc: "View businesses on a live map, explore areas, get directions.",
            },
            {
              icon: "🏢",
              title: "12+ Categories",
              desc: "Home Services, Healthcare, Food, Automotive, Education and more.",
            },
            {
              icon: "📍",
              title: "Nearby Now",
              desc: "One-tap GPS search to instantly discover businesses near you.",
            },
            {
              icon: "🏪",
              title: "Vendor Portal",
              desc: "Business owners can list and manage their services for free.",
            },
            {
              icon: "✅",
              title: "Verified Listings",
              desc: "All listings reviewed by our team before going live.",
            },
          ]
            .map(
              (f) => `
            <div style="background:#f8f9fa;border-radius:12px;padding:20px">
              <div style="font-size:28px;margin-bottom:8px">${f.icon}</div>
              <div style="font-size:14px;font-weight:700;color:#202124;margin-bottom:4px">${f.title}</div>
              <div style="font-size:13px;color:#5f6368;line-height:1.5">${f.desc}</div>
            </div>
          `,
            )
            .join("")}
        </div>

        <h2 style="font-size:20px;font-weight:700;color:#202124;margin-bottom:12px;margin-top:36px">For Businesses</h2>
        <p style="font-size:16px;line-height:1.7;color:#3c4043;margin-bottom:16px">
          Are you a business owner? List your business on Dhoondho for free and get discovered by thousands of customers in your area.
        </p>
        <a href="#/vendor" style="display:inline-block;padding:12px 28px;background:#1a7a3c;color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:700">List Your Business</a>

        <div style="margin-top:48px;padding-top:24px;border-top:1px solid #e8eaed">
          <p style="font-size:13px;color:#9aa0a6">Built with ❤️ for India &bull; <a href="#/support" style="color:#1a73e8;text-decoration:none">Contact Us</a></p>
        </div>
      </div>
      ${renderPageFooter(main)}
    </div>
  `;
}
