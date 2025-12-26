export const WS_BASE_URL =
  import.meta.env.VITE_WS_BASE_URL || "ws://localhost:7000";

export const WS_URL = WS_BASE_URL.concat("/ws");
