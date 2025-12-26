import { GameSocketClient } from "../api/GameSocketClient";
import { GameState } from "./GameState";
import { GameIncomingMessage, GameStateSnapshot } from "../types/socket";
import { Action } from "../types/game";

export class GameSocket {
  private client: GameSocketClient;
  private gameState: GameState;

  constructor(gameState: GameState, url: string) {
    this.gameState = gameState;
    this.client = new GameSocketClient(url);

    this.client.onMessage(this.handleMessage.bind(this));
  }

  private handleMessage(message: GameIncomingMessage): void {
    if ("type" in message && message.type === "PONG") {
      return;
    }

    if ("players" in message && "bench" in message) {
      this.gameState.applyServerUpdate(message as GameStateSnapshot);
    }
  }

  sendAction(action: Action): void {
    this.gameState.enqueueAction(action);
    this.client.send({ type: "ACTION", payload: { action } });
  }

  destroy(): void {
    this.client.close();
    this.gameState.reset();
  }
}
