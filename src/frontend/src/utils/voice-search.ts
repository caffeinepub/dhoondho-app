// ============================================================
// Dhoondho Voice Search Module – Steps 12-20
// Supports SpeechRecognition + webkitSpeechRecognition (iOS/Android)
// ============================================================

function getSpeechAPI(): any {
  return (
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition ||
    null
  );
}

function setMicState(
  btn: HTMLElement,
  state: "idle" | "listening" | "error",
  message?: string,
): void {
  btn.setAttribute("data-voice-state", state);
  btn.title =
    message ||
    (state === "listening" ? "Listening... (tap to stop)" : "Voice Search");

  if (state === "listening") {
    btn.style.background = "rgba(234,67,53,0.12)";
    btn.style.borderRadius = "50%";
    btn.style.animation = "dhoondho-mic-pulse 1s ease-in-out infinite";
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    `;
  } else {
    btn.style.background = "none";
    btn.style.animation = "none";
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${state === "error" ? "#EA4335" : "#5f6368"}" stroke-width="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    `;
  }
}

function showListeningOverlay(): () => void {
  const el = document.createElement("div");
  el.id = "voice-listening-overlay";
  el.style.cssText =
    "position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#fff;border-radius:50px;padding:12px 24px;box-shadow:0 4px 20px rgba(0,0,0,0.15);display:flex;align-items:center;gap:10px;z-index:9999;font-size:14px;font-weight:600;color:#202124";
  el.innerHTML = `
    <span style="display:flex;gap:3px;align-items:center">
      <span style="width:4px;height:16px;background:#EA4335;border-radius:2px;animation:dhoondho-bar 0.8s ease-in-out infinite"></span>
      <span style="width:4px;height:22px;background:#4285F4;border-radius:2px;animation:dhoondho-bar 0.8s ease-in-out 0.15s infinite"></span>
      <span style="width:4px;height:18px;background:#34A853;border-radius:2px;animation:dhoondho-bar 0.8s ease-in-out 0.3s infinite"></span>
      <span style="width:4px;height:24px;background:#FBBC05;border-radius:2px;animation:dhoondho-bar 0.8s ease-in-out 0.45s infinite"></span>
    </span>
    <span>Listening...</span>
  `;
  document.body.appendChild(el);
  return () => el.remove();
}

function ensureVoiceStyles(): void {
  if (document.getElementById("dhoondho-voice-styles")) return;
  const style = document.createElement("style");
  style.id = "dhoondho-voice-styles";
  style.textContent = `
    @keyframes dhoondho-mic-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(234,67,53,0.4); }
      50% { box-shadow: 0 0 0 8px rgba(234,67,53,0); }
    }
    @keyframes dhoondho-bar {
      0%, 100% { transform: scaleY(0.5); opacity: 0.7; }
      50% { transform: scaleY(1.3); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

export interface VoiceSearchOptions {
  inputEl: HTMLInputElement;
  micBtn: HTMLElement;
  onResult: (transcript: string) => void;
  language?: string;
}

export function initVoiceSearch(options: VoiceSearchOptions): () => void {
  const { inputEl, micBtn, onResult, language = "en-IN" } = options;
  ensureVoiceStyles();

  const SR = getSpeechAPI();
  if (!SR) {
    micBtn.title = "Voice search not supported in this browser";
    micBtn.style.opacity = "0.4";
    micBtn.style.cursor = "not-allowed";
    return () => {};
  }

  let recognition: any = null;
  let isListening = false;
  let removeOverlay: (() => void) | null = null;

  const stopListening = () => {
    if (recognition) {
      try {
        recognition.stop();
      } catch {
        /* ignore */
      }
      recognition = null;
    }
    isListening = false;
    setMicState(micBtn, "idle");
    removeOverlay?.();
    removeOverlay = null;
  };

  const startListening = () => {
    if (isListening) {
      stopListening();
      return;
    }

    recognition = new SR();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    isListening = true;
    setMicState(micBtn, "listening");
    removeOverlay = showListeningOverlay();

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      inputEl.value = transcript;
      stopListening();
      onResult(transcript);
    };

    recognition.onerror = (e: any) => {
      stopListening();
      if (e.error === "not-allowed") {
        setMicState(micBtn, "error", "Microphone permission denied");
        const bar = document.createElement("div");
        bar.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#fff;border-radius:12px;padding:12px 20px;box-shadow:0 4px 20px rgba(0,0,0,0.15);font-size:13px;color:#EA4335;z-index:9999";
        bar.textContent =
          "🎤 Microphone permission denied. Please allow access in browser settings.";
        document.body.appendChild(bar);
        setTimeout(() => bar.remove(), 4000);
      } else if (e.error === "no-speech") {
        const bar = document.createElement("div");
        bar.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#fff;border-radius:12px;padding:12px 20px;box-shadow:0 4px 20px rgba(0,0,0,0.15);font-size:13px;color:#5f6368;z-index:9999";
        bar.textContent = "🎤 No speech detected. Try again.";
        document.body.appendChild(bar);
        setTimeout(() => bar.remove(), 3000);
      }
    };

    recognition.onend = () => {
      if (isListening) stopListening();
    };

    try {
      recognition.start();
    } catch {
      stopListening();
    }
  };

  // Remove any previously attached handler to prevent accumulation
  if ((micBtn as any)._voiceHandler) {
    micBtn.removeEventListener("click", (micBtn as any)._voiceHandler);
  }
  (micBtn as any)._voiceHandler = startListening;
  micBtn.addEventListener("click", startListening);
  return stopListening;
}
