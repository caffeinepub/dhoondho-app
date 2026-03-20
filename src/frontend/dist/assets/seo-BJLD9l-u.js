import { s as showNavbar, r as renderPageFooter } from "./index-CTzEP8Ey.js";
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderSEOPage(path) {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  const slug = path.replace("/seo/", "");
  const parts = slug.split("-");
  const city = parts.pop() || "";
  const service = parts.join(" ");
  const title = `${service.charAt(0).toUpperCase() + service.slice(1)} in ${city.charAt(0).toUpperCase() + city.slice(1)}`;
  document.title = `${title} - Dhoondho.App`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc)
    metaDesc.setAttribute(
      "content",
      `Find the best ${service} services in ${city}. Browse verified listings on Dhoondho - India's local search engine.`
    );
  const schema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: title,
    description: `Top ${service} services in ${city}`,
    url: window.location.href
  };
  let schemaEl = document.getElementById("seo-schema");
  if (!schemaEl) {
    schemaEl = document.createElement("script");
    schemaEl.id = "seo-schema";
    schemaEl.setAttribute("type", "application/ld+json");
    document.head.appendChild(schemaEl);
  }
  schemaEl.textContent = JSON.stringify(schema);
  main.innerHTML = `
    <div style="min-height:100vh;background:#fff">
      <div style="max-width:900px;margin:0 auto;padding:48px 24px">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>

        <h1 style="font-size:28px;font-weight:700;color:#202124;margin-bottom:8px">${escapeHtml(title)}</h1>
        <p style="font-size:15px;color:#5f6368;margin-bottom:32px">
          Find the best ${escapeHtml(service)} services in ${escapeHtml(city.charAt(0).toUpperCase() + city.slice(1))}, India.
          Browse verified, top-rated local professionals on Dhoondho.
        </p>

        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:32px">
          <a href="#/search?q=${encodeURIComponent(service)}&city=${encodeURIComponent(city)}"
            style="display:inline-block;padding:12px 24px;background:#1a7a3c;color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:700">
            🔍 Search ${escapeHtml(service)} in ${escapeHtml(city.charAt(0).toUpperCase() + city.slice(1))}
          </a>
          <a href="#/search?q=${encodeURIComponent(service)}"
            style="display:inline-block;padding:12px 24px;background:#f1f1f1;color:#202124;border-radius:24px;text-decoration:none;font-size:14px;font-weight:500">
            All India Search
          </a>
        </div>

        <div style="background:#f8f9fa;border-radius:16px;padding:24px;margin-bottom:24px">
          <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:12px">Why choose Dhoondho for ${escapeHtml(service)}?</h2>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px">
            <li style="display:flex;gap:10px;font-size:14px;color:#3c4043"><span>✅</span>Verified local professionals</li>
            <li style="display:flex;gap:10px;font-size:14px;color:#3c4043"><span>⭐</span>Customer reviews &amp; ratings</li>
            <li style="display:flex;gap:10px;font-size:14px;color:#3c4043"><span>📍</span>GPS-based nearby search</li>
            <li style="display:flex;gap:10px;font-size:14px;color:#3c4043"><span>📞</span>Direct contact &amp; booking</li>
          </ul>
        </div>
      </div>
      ${renderPageFooter()}
    </div>
  `;
}
export {
  renderSEOPage
};
