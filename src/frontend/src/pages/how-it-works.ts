import { initFooterReactivity, renderFooter } from "../components/footer";
import { renderNavbar } from "../components/navbar";

export function renderHowItWorksPage(): void {
  document.title = "How It Works - Dhoondho.App";
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <div id="navbar-container"></div>
    <main id="main-content" style="flex:1">
      <!-- Hero -->
      <section style="background:linear-gradient(135deg,#1a7a3c 0%,#0d4f26 100%);color:#fff;padding:60px 24px 48px">
        <div style="max-width:800px;margin:0 auto;text-align:center">
          <h1 style="font-size:clamp(28px,5vw,44px);font-weight:800;margin-bottom:12px">How Dhoondho Works</h1>
          <p style="font-size:clamp(15px,2.5vw,18px);opacity:0.9;max-width:560px;margin:0 auto">India&rsquo;s smartest local search engine &mdash; connecting people with trusted local businesses instantly.</p>
        </div>
      </section>

      <!-- Steps -->
      <section style="max-width:900px;margin:0 auto;padding:48px 24px">

        <!-- How Users Search -->
        <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:48px;flex-wrap:wrap">
          <div style="background:#e8f5e9;border-radius:50%;width:64px;height:64px;min-width:64px;display:flex;align-items:center;justify-content:center;font-size:28px">🔍</div>
          <div style="flex:1;min-width:240px">
            <h2 style="font-size:22px;font-weight:700;color:#1a7a3c;margin-bottom:8px">1. How Users Search</h2>
            <p style="color:#444;line-height:1.7;margin-bottom:8px">Users simply type a service or business name (e.g. <em>&quot;plumber in Delhi&quot;</em> or <em>&quot;salon near me&quot;</em>) into the Dhoondho search bar. The platform instantly returns nearby businesses on an interactive map along with a ranked list.</p>
            <ul style="color:#555;line-height:1.8;padding-left:20px">
              <li>Search by city, neighbourhood, or GPS &ldquo;Nearby Now&rdquo;</li>
              <li>Filter by category: Plumbing, Food, Healthcare, Education &amp; more</li>
              <li>Voice search available in Indian accents (en-IN)</li>
              <li>Results shown on live map with pin markers</li>
              <li>One tap to call, get directions, or book</li>
            </ul>
          </div>
        </div>

        <!-- How Vendors List -->
        <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:48px;flex-wrap:wrap">
          <div style="background:#fff3e0;border-radius:50%;width:64px;height:64px;min-width:64px;display:flex;align-items:center;justify-content:center;font-size:28px">🏪</div>
          <div style="flex:1;min-width:240px">
            <h2 style="font-size:22px;font-weight:700;color:#e65100;margin-bottom:8px">2. How Vendors List Their Business</h2>
            <p style="color:#444;line-height:1.7;margin-bottom:8px">Any business owner can register on Dhoondho for free using Internet Identity (secure, password-free login). Once registered:</p>
            <ul style="color:#555;line-height:1.8;padding-left:20px">
              <li>Create a detailed business listing (name, category, address, phone, hours)</li>
              <li>Upload photos and business documents for verification</li>
              <li>Manage availability, pricing, and services from the Vendor Dashboard</li>
              <li>Receive customer enquiries and booking requests directly</li>
              <li>Upgrade to Featured listing for higher visibility</li>
            </ul>
          </div>
        </div>

        <!-- How Admin Approves -->
        <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:48px;flex-wrap:wrap">
          <div style="background:#e8eaf6;border-radius:50%;width:64px;height:64px;min-width:64px;display:flex;align-items:center;justify-content:center;font-size:28px">🛡️</div>
          <div style="flex:1;min-width:240px">
            <h2 style="font-size:22px;font-weight:700;color:#3949ab;margin-bottom:8px">3. How Admin Approves &amp; Manages</h2>
            <p style="color:#444;line-height:1.7;margin-bottom:8px">A dedicated admin panel gives platform administrators full control over quality and safety:</p>
            <ul style="color:#555;line-height:1.8;padding-left:20px">
              <li>Review and approve/reject new business submissions</li>
              <li>Verify uploaded documents (GST, PAN, Aadhaar, FSSAI)</li>
              <li>Handle user complaints, edit suggestions, and ownership claims</li>
              <li>Monitor platform analytics: users, listings, searches, revenue</li>
              <li>Manage feature toggles, search rankings, and ad campaigns</li>
              <li>Support ticket system to resolve user and vendor issues</li>
            </ul>
          </div>
        </div>

        <!-- How Platform Works -->
        <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:48px;flex-wrap:wrap">
          <div style="background:#fce4ec;border-radius:50%;width:64px;height:64px;min-width:64px;display:flex;align-items:center;justify-content:center;font-size:28px">⚙️</div>
          <div style="flex:1;min-width:240px">
            <h2 style="font-size:22px;font-weight:700;color:#c62828;margin-bottom:8px">4. How the Platform Works</h2>
            <p style="color:#444;line-height:1.7;margin-bottom:8px">Dhoondho is built on the <strong>Internet Computer (ICP)</strong> blockchain &mdash; a decentralised, tamper-proof, always-on infrastructure:</p>
            <ul style="color:#555;line-height:1.8;padding-left:20px">
              <li>All data stored permanently on-chain &mdash; no central server to hack</li>
              <li>Internet Identity login &mdash; no passwords, no data leaks</li>
              <li>Supports 10 Indian languages with real-time UI switching</li>
              <li>GPS + map integration (Leaflet + OpenStreetMap)</li>
              <li>PWA support &mdash; installable like a native app on any phone</li>
              <li>AI Assistant answers local search queries inline</li>
            </ul>
          </div>
        </div>

        <!-- Benefits -->
        <div style="background:#f1f8e9;border-radius:16px;padding:32px;margin-bottom:48px">
          <h2 style="font-size:24px;font-weight:700;color:#2e7d32;margin-bottom:20px;text-align:center">5. Who Benefits &amp; How</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px">
            <div style="background:#fff;border-radius:12px;padding:20px;border-left:4px solid #1a7a3c">
              <h3 style="font-weight:700;color:#1a7a3c;margin-bottom:8px">👥 For People (Users)</h3>
              <ul style="color:#555;line-height:1.8;padding-left:16px;font-size:14px">
                <li>Find verified local services in seconds</li>
                <li>Read authentic reviews from real customers</li>
                <li>Compare options on the map before calling</li>
                <li>Book appointments or request callbacks instantly</li>
                <li>Save favourites and search history</li>
                <li>Works in your language &mdash; Hindi, Tamil, Telugu &amp; more</li>
              </ul>
            </div>
            <div style="background:#fff;border-radius:12px;padding:20px;border-left:4px solid #e65100">
              <h3 style="font-weight:700;color:#e65100;margin-bottom:8px">🏢 For Businesses (Vendors)</h3>
              <ul style="color:#555;line-height:1.8;padding-left:16px;font-size:14px">
                <li>Free listing &mdash; no commission on leads</li>
                <li>Get discovered by thousands of local customers</li>
                <li>Manage your profile, photos, and hours anytime</li>
                <li>Receive direct bookings and enquiries</li>
                <li>Featured listings drive 3&times; more visibility</li>
                <li>Build credibility with verified badges</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div style="text-align:center;padding:32px 0">
          <a href="#/" style="display:inline-block;background:#1a7a3c;color:#fff;font-weight:700;font-size:16px;padding:14px 36px;border-radius:999px;text-decoration:none;margin:8px">Start Searching</a>
          <a href="#/vendor" style="display:inline-block;background:#e65100;color:#fff;font-weight:700;font-size:16px;padding:14px 36px;border-radius:999px;text-decoration:none;margin:8px">List Your Business</a>
        </div>
      </section>

      <div id="footer-container"></div>
    </main>
  `;

  renderNavbar();
  renderFooter();
  initFooterReactivity();
}
