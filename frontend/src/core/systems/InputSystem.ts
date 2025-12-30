import { Intent } from "../../types/game";
import { BaseScene } from "../BaseScene";
import { Game } from "../Game";

const KEY_BINDINGS: Record<string, Intent> = {
  s: Intent.Sit,
  w: Intent.Wave,
  p: Intent.Pat,
  l: Intent.Leave,
  x: Intent.Smoke,
};

export class InputSystem {
  private game: Game;
  private active = false;
  private activeScene: BaseScene | null = null;

  constructor(game: Game) {
    this.game = game;
  }

  activate(scene: BaseScene): void {
    if (this.active) return;

    this.active = true;
    this.activeScene = scene;

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  deactivate(): void {
    if (!this.active) return;

    this.active = false;
    this.activeScene = null;

    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.active || !this.game.state.snapshot) return;

    const intent = KEY_BINDINGS[event.key.toLowerCase()];

    if (!intent) {
      return;
    }

    if (event.key === " " || event.key === "s" || event.key === "x") {
      event.preventDefault();
    }

    this.handleIntent(intent);
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    return;
  };

  private handleIntent(intent: Intent) {
    switch (intent) {
      case Intent.Smoke:
        const currentPlayer = this.game.getCurrentPlayerState();

        if (currentPlayer?.state === "smoking") {
          this.game.sendAction("stop_smoking");
        } else {
          this.game.sendAction("smoke");
        }

        break;
    }
  }

  destroy(): void {
    this.deactivate();
  }
}
