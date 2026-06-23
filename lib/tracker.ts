export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem("cf_session_id");
  if (!sessionId) {
    sessionId =
      "sess_" + Math.random().toString(36).slice(2, 11) + "_" + Date.now();
    localStorage.setItem("cf_session_id", sessionId);
  }
  return sessionId;
}

export async function sendEvent(
  eventType: "page_view" | "click",
  additional: { x?: number; y?: number; pageUrl?: string } = {}
) {
  if (typeof window === "undefined") return;
  try {
    const session_id = getSessionId();
    const page_url = additional.pageUrl || window.location.pathname;

    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id,
        event_type: eventType,
        page_url,
        x: additional.x,
        y: additional.y,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Tracking failed", error);
  }
}

export function initTracker() {
  if (typeof window === "undefined") return () => {};

  const handleClick = (e: MouseEvent) => {
    sendEvent("click", {
      x: e.clientX,
      y: e.clientY,
    });
  };

  window.addEventListener("click", handleClick);

  return () => {
    window.removeEventListener("click", handleClick);
  };
}
