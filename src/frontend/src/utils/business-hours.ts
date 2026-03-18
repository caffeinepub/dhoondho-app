// Step 33 – Business Hours System

export function isOpenNow(hours: string): boolean {
  if (!hours || hours.trim() === "") return false;
  const h = hours.trim().toLowerCase();
  if (h === "24/7" || h === "open 24/7" || h === "always open") return true;

  const now = new Date();
  const dayIndex = now.getDay();
  const DAY_NAMES = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const todayAbbr = DAY_NAMES[dayIndex];

  const segments = h.split(",").map((s) => s.trim());
  for (const seg of segments) {
    const colonIdx = seg.indexOf(":");
    if (colonIdx === -1) continue;
    const dayPart = seg.slice(0, colonIdx).trim();
    const timePart = seg.slice(colonIdx + 1).trim();
    if (!dayMatchesToday(dayPart, todayAbbr, DAY_NAMES)) continue;
    const dashIdx = timePart.indexOf(" - ");
    if (dashIdx === -1) continue;
    const openMins = parseTimeMins(timePart.slice(0, dashIdx).trim());
    const closeMins = parseTimeMins(timePart.slice(dashIdx + 3).trim());
    const nowMins = now.getHours() * 60 + now.getMinutes();
    if (openMins !== null && closeMins !== null) {
      if (openMins <= closeMins) {
        if (nowMins >= openMins && nowMins < closeMins) return true;
      } else {
        if (nowMins >= openMins || nowMins < closeMins) return true;
      }
    }
  }
  return false;
}

function dayMatchesToday(
  dayPart: string,
  todayAbbr: string,
  DAY_NAMES: string[],
): boolean {
  if (dayPart === "daily" || dayPart === "everyday" || dayPart === "all days")
    return true;
  const rangeMatch = dayPart.match(/^([a-z]+)-([a-z]+)$/);
  if (rangeMatch) {
    const startIdx = DAY_NAMES.findIndex((d) => d.startsWith(rangeMatch[1]));
    const endIdx = DAY_NAMES.findIndex((d) => d.startsWith(rangeMatch[2]));
    const todayIdx = DAY_NAMES.indexOf(todayAbbr);
    if (startIdx !== -1 && endIdx !== -1 && todayIdx !== -1) {
      if (startIdx <= endIdx) return todayIdx >= startIdx && todayIdx <= endIdx;
      return todayIdx >= startIdx || todayIdx <= endIdx;
    }
  }
  return dayPart.startsWith(todayAbbr);
}

function parseTimeMins(str: string): number | null {
  const m = str.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!m) return null;
  let hours = Number.parseInt(m[1], 10);
  const mins = m[2] ? Number.parseInt(m[2], 10) : 0;
  const ampm = m[3].toLowerCase();
  if (ampm === "pm" && hours !== 12) hours += 12;
  if (ampm === "am" && hours === 12) hours = 0;
  return hours * 60 + mins;
}

export function getStatusBadge(hours: string): string {
  if (!hours || hours.trim() === "") return "";
  const open = isOpenNow(hours);
  if (open) {
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;background:#e8f5e9;color:#2e7d32;border:1px solid #a5d6a7"><span style="width:6px;height:6px;border-radius:50%;background:#43a047;display:inline-block"></span>Open Now</span>`;
  }
  return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;background:#ffebee;color:#c62828;border:1px solid #ef9a9a"><span style="width:6px;height:6px;border-radius:50%;background:#ef5350;display:inline-block"></span>Closed</span>`;
}
