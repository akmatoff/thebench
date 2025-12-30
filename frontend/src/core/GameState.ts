import { Action } from "../types/game";
import { GameStateSnapshot } from "../types/messages";
import { MovementDirection } from "../types/player";

export class GameState {
  private _snapshot: GameStateSnapshot | null = null;

  private actionQueue: { action: Action; timestamp: number }[] = [];

  private onUpdate: ((snapshot: GameStateSnapshot) => void) | null = null;

  get snapshot(): GameStateSnapshot | null {
    return this._snapshot;
  }

  setOnUpdate(callback: (snapshot: GameStateSnapshot) => void): void {
    this.onUpdate = callback;
  }

  applyServerUpdate(snapshot: GameStateSnapshot): void {
    this._snapshot = snapshot;

    if (this.onUpdate) {
      this.onUpdate(snapshot);
    }
  }

  enqueueAction(action: Action): void {
    this.actionQueue.push({ action, timestamp: Date.now() });
  }

  handleMovement(direction: MovementDirection) {
    if (!this._snapshot) return;
  }

  reset(): void {
    this._snapshot = null;
    this.actionQueue = [];
  }

  get pendingActions(): Action[] {
    return this.actionQueue.map((q) => q.action);
  }
}
