import { GameIncomingMessage, GameOutgoingMessage } from "../types/socket";

export class GameSocketClient {
  private url: string;
  private ws: WebSocket | null = null;

  private reconnectionAttempts = 0;
  private maxReconnectionAttempts = 5;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;
  private readonly heartbeatIntervalMs = 10000;

  private onMessageHandler: ((message: GameIncomingMessage) => void) | null =
    null;
  private onErrorHandler: (() => void) | null = null;
  private onCloseHandler: (() => void) | null = null;
  private onOpenHandler: (() => void) | null = null;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.reconnectionAttempts = 0;
      this.startHeartbeat();
      this.onOpenHandler?.();
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.onMessageHandler?.(data);

        console.log(data);
      } catch (e) {
        console.error("Failed to parse event message:", event.data, e);
      }
    };

    this.ws.onerror = () => {
      this.onErrorHandler?.();
    };

    this.ws.onclose = () => {
      this.cleanupHearbeat();
      this.reconnect();
      this.onCloseHandler?.();
    };
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.send({ type: "PING" });
    }, this.heartbeatIntervalMs);
  }

  private cleanupHearbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private reconnect() {
    if (this.reconnectionAttempts > this.maxReconnectionAttempts) {
      console.warn("Max reconnection attempts reached");
      return;
    }

    this.reconnectionAttempts++;

    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, 1000);
  }

  send(message: GameOutgoingMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not open");
    }
  }

  close() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    this.cleanupHearbeat();

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  onOpen(handler: () => void) {
    this.onOpenHandler = handler;
  }

  onMessage(handler: (message: GameIncomingMessage) => void) {
    this.onMessageHandler = handler;
  }

  onError(handler: () => void) {
    this.onErrorHandler = handler;
  }

  onClose(handler: () => void) {
    this.onCloseHandler = handler;
  }
}
