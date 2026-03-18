// ============================================================
// Dhoondho AI Assistant – Step 23
// Keyword-based local search chat widget (no external API)
// ============================================================

const CATEGORIES = [
  "plumber",
  "electrician",
  "carpenter",
  "painter",
  "mechanic",
  "doctor",
  "hospital",
  "clinic",
  "pharmacy",
  "dentist",
  "restaurant",
  "hotel",
  "cafe",
  "food",
  "delivery",
  "school",
  "tutor",
  "coaching",
  "gym",
  "yoga",
  "salon",
  "spa",
  "beauty",
  "tailor",
  "laundry",
  "bank",
  "atm",
  "insurance",
  "lawyer",
  "ca",
  "real estate",
  "property",
  "rent",
  "pg",
  "flat",
  "event",
  "photographer",
  "caterer",
  "decorator",
  "packers",
  "movers",
  "logistics",
  "courier",
  "ac repair",
  "washing machine",
  "tv repair",
  "appliance",
];

const INDIAN_CITIES = [
  "delhi",
  "mumbai",
  "bangalore",
  "bengaluru",
  "hyderabad",
  "chennai",
  "kolkata",
  "pune",
  "ahmedabad",
  "jaipur",
  "surat",
  "lucknow",
  "kanpur",
  "nagpur",
  "patna",
  "indore",
  "thane",
  "bhopal",
  "visakhapatnam",
  "vadodara",
  "gurgaon",
  "gurugram",
  "noida",
  "faridabad",
];

function detectIntent(msg: string): {
  category: string | null;
  city: string | null;
} {
  const lower = msg.toLowerCase();
  const category = CATEGORIES.find((c) => lower.includes(c)) || null;
  const city = INDIAN_CITIES.find((c) => lower.includes(c)) || null;
  return { category, city };
}

function buildResponse(msg: string): string {
  const lower = msg.toLowerCase();

  // Greeting
  if (/^(hi|hello|hey|namaste|namaskar)/.test(lower)) {
    return "Namaste! 🙏 I'm Dhoondho Assistant. Ask me to find any local service -- e.g., <i>Find plumber in Delhi</i> or <i>Show restaurants near me</i>.";
  }

  // Help
  if (lower.includes("help") || lower.includes("what can you do")) {
    return "I can help you find local businesses and services across India. Try asking:<br>• <a href='#/search?q=plumber' style='color:#1a7a3c'>Find a plumber near me</a><br>• <a href='#/search?q=restaurant' style='color:#1a7a3c'>Restaurants in my city</a><br>• <a href='#/search?q=doctor' style='color:#1a7a3c'>Doctors near me</a>";
  }

  const { category, city } = detectIntent(msg);

  if (category && city) {
    const q = encodeURIComponent(category);
    return `Here are <strong>${category}</strong> services in <strong>${city.charAt(0).toUpperCase() + city.slice(1)}</strong>:<br><br><a href='#/search?q=${q}&city=${city}' style='display:inline-block;padding:8px 16px;background:#1a7a3c;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px'>🔍 View Results</a>`;
  }

  if (category) {
    const storedCity = localStorage.getItem("dhoondho_city");
    const q = encodeURIComponent(category);
    const cityHint = storedCity
      ? ` in <strong>${storedCity}</strong>`
      : " near you";
    return `Looking for <strong>${category}</strong>${cityHint}?<br><br><a href='#/search?q=${q}' style='display:inline-block;padding:8px 16px;background:#1a7a3c;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px'>🔍 View Results</a>`;
  }

  if (city) {
    return `Searching for services in <strong>${city.charAt(0).toUpperCase() + city.slice(1)}</strong>? What type of service are you looking for?<br><br><a href='#/search?city=${city}' style='display:inline-block;padding:8px 16px;background:#1a7a3c;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px'>🔍 Browse All Services</a>`;
  }

  if (lower.includes("near") || lower.includes("nearby")) {
    return `For services near you, I need your location. <a href='#/' style='color:#1a7a3c'>Go to homepage</a> and click <strong>Nearby Now 🔥</strong> to find services close to you.`;
  }

  return `I can help you find local services. Try:<br>• "Find plumber in Mumbai"<br>• "Restaurants near me"<br>• "Electrician in Pune"<br><br>Or use the <a href='#/search' style='color:#1a7a3c'>search page</a> to browse all listings.`;
}

function ensureStyles(): void {
  if (document.getElementById("dhoondho-ai-styles")) return;
  const style = document.createElement("style");
  style.id = "dhoondho-ai-styles";
  style.textContent = `
    #dhoondho-ai-widget { position: fixed; bottom: 24px; right: 24px; z-index: 9998; }
    #dhoondho-ai-fab {
      width: 56px; height: 56px; border-radius: 50%; border: none; cursor: pointer;
      background: linear-gradient(135deg, #1a7a3c, #34A853);
      box-shadow: 0 4px 16px rgba(26,122,60,0.4);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; transition: transform 0.2s;
    }
    #dhoondho-ai-fab:hover { transform: scale(1.08); }
    #dhoondho-ai-panel {
      position: absolute; bottom: 70px; right: 0;
      width: 320px; max-height: 480px;
      background: #fff; border-radius: 20px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      display: flex; flex-direction: column; overflow: hidden;
      transform-origin: bottom right;
      animation: ai-panel-in 0.2s ease;
    }
    @keyframes ai-panel-in {
      from { opacity: 0; transform: scale(0.8); }
      to   { opacity: 1; transform: scale(1); }
    }
    #dhoondho-ai-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .ai-msg-bot, .ai-msg-user {
      padding: 10px 14px; border-radius: 14px;
      font-size: 13px; line-height: 1.5; max-width: 85%;
    }
    .ai-msg-bot { background: #f1f3f4; color: #202124; align-self: flex-start; }
    .ai-msg-user { background: #1a7a3c; color: #fff; align-self: flex-end; }
    #dhoondho-ai-input-row {
      display: flex; gap: 8px; padding: 12px 14px;
      border-top: 1px solid #f0f0f0;
    }
    #dhoondho-ai-input {
      flex: 1; border: 1px solid #e0e0e0; border-radius: 20px;
      padding: 8px 14px; font-size: 13px; outline: none;
    }
    #dhoondho-ai-send {
      width: 36px; height: 36px; border-radius: 50%; border: none;
      background: #1a7a3c; color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    @media (max-width: 400px) {
      #dhoondho-ai-panel { width: calc(100vw - 32px); right: -8px; }
    }
  `;
  document.head.appendChild(style);
}

export function initAIAssistant(): void {
  if (document.getElementById("dhoondho-ai-widget")) return;
  ensureStyles();

  const widget = document.createElement("div");
  widget.id = "dhoondho-ai-widget";
  widget.innerHTML = `
    <button id="dhoondho-ai-fab" title="Dhoondho Assistant"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></button>
  `;
  document.body.appendChild(widget);

  let panelOpen = false;

  const fab = document.getElementById("dhoondho-ai-fab")!;
  fab.addEventListener("click", () => {
    if (panelOpen) {
      document.getElementById("dhoondho-ai-panel")?.remove();
      panelOpen = false;
      return;
    }
    openPanel();
    panelOpen = true;
  });

  function openPanel(): void {
    const panel = document.createElement("div");
    panel.id = "dhoondho-ai-panel";
    panel.innerHTML = `
      <div style="background:linear-gradient(135deg,#1a7a3c,#34A853);padding:14px 16px;display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:10px">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <div>
            <div style="font-size:14px;font-weight:700;color:#fff">Dhoondho Assistant</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.8)">Your local search guide</div>
          </div>
        </div>
        <button id="ai-close-btn" style="background:none;border:none;color:#fff;cursor:pointer;font-size:18px;line-height:1">✕</button>
      </div>
      <div id="dhoondho-ai-messages"></div>
      <div id="dhoondho-ai-input-row">
        <input id="dhoondho-ai-input" type="text" placeholder="Ask me anything..." />
        <button id="dhoondho-ai-send">➤</button>
      </div>
    `;
    widget.appendChild(panel);

    document.getElementById("ai-close-btn")?.addEventListener("click", () => {
      panel.remove();
      panelOpen = false;
    });

    addBotMessage(
      "Namaste! 🙏 I'm Dhoondho Assistant. How can I help you find local services today?",
    );

    const inputEl = document.getElementById(
      "dhoondho-ai-input",
    ) as HTMLInputElement;
    const sendBtn = document.getElementById("dhoondho-ai-send")!;

    const send = () => {
      const msg = inputEl.value.trim();
      if (!msg) return;
      inputEl.value = "";
      addUserMessage(msg);
      setTimeout(() => addBotMessage(buildResponse(msg)), 400);
    };

    sendBtn.addEventListener("click", send);
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") send();
    });

    inputEl.focus();
  }

  function addBotMessage(html: string): void {
    const messages = document.getElementById("dhoondho-ai-messages");
    if (!messages) return;
    const el = document.createElement("div");
    el.className = "ai-msg-bot";
    el.innerHTML = html;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  function addUserMessage(text: string): void {
    const messages = document.getElementById("dhoondho-ai-messages");
    if (!messages) return;
    const el = document.createElement("div");
    el.className = "ai-msg-user";
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }
}
