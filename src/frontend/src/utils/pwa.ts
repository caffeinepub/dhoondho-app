// Step 38 – PWA Registration & Install Banner

let deferredPrompt: Event | null = null;

export function initPWA(): void {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }

  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    deferredPrompt = e;
    setTimeout(() => {
      if (!localStorage.getItem("dhoondho_pwa_dismissed")) showInstallBanner();
    }, 30000);
  });
}

function showInstallBanner(): void {
  if (document.getElementById("pwa-install-banner")) return;
  const banner = document.createElement("div");
  banner.id = "pwa-install-banner";
  banner.style.cssText =
    "position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#fff;border:1px solid #e8eaed;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.15);padding:16px 20px;display:flex;align-items:center;gap:12px;z-index:9999;max-width:340px;width:calc(100% - 32px)";
  banner.innerHTML = `
    <div style="font-size:32px">📱</div>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:700;color:#202124">Add Dhoondho to Home Screen</div>
      <div style="font-size:11px;color:#5f6368;margin-top:2px">Quick access to India's local search</div>
    </div>
    <button id="pwa-install-btn" style="padding:8px 14px;background:#1a7a3c;color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">Install</button>
    <button id="pwa-dismiss-btn" style="padding:8px;background:none;border:none;cursor:pointer;color:#5f6368;font-size:18px">×</button>
  `;
  document.body.appendChild(banner);
  document
    .getElementById("pwa-install-btn")
    ?.addEventListener("click", async () => {
      if (deferredPrompt) {
        (deferredPrompt as any).prompt();
        await (deferredPrompt as any).userChoice;
        deferredPrompt = null;
      }
      banner.remove();
      localStorage.setItem("dhoondho_pwa_dismissed", "1");
    });
  document.getElementById("pwa-dismiss-btn")?.addEventListener("click", () => {
    banner.remove();
    localStorage.setItem("dhoondho_pwa_dismissed", "1");
  });
}
