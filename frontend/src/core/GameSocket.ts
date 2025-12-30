import { GameSocketClient } from "../api/GameSocketClient";
import { GameState } from "./GameState";
import { GameIncomingMessage, GameStateSnapshot } from "../types/messages";
import { Action } from "../types/game";

export class GameSocket {
  private client: GameSocketClient;
  private gameState: GameState;

  onConnected: ((playerId: string) => void) | null = null;

  constructor(gameState: GameState, url: string) {
    this.gameState = gameState;
    this.client = new GameSocketClient(url);
    this.client.onMessage(this.handleMessage.bind(this));
  }

  private handleMessage(message: GameIncomingMessage): void {
    switch (message.type) {
      case "PONG":
        return;
      case "CONNECTED":
        this.onConnected?.(message.payload.playerId);
        return;

      case "STATE":
        this.gameState.applyServerUpdate(message.payload);
        return;
    }
  }

  sendAction(action: Action): void {
    console.log("Sending action: ", action);
    this.gameState.enqueueAction(action);
    this.client.send({ type: "ACTION", payload: { action } });
  }

  destroy(): void {
    this.client.close();
    this.gameState.reset();
  }
}
