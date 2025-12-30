import { Intent } from "../../types/game";
import { MovementDirection } from "../../types/player";
import { BaseScene } from "../BaseScene";
import { Game } from "../Game";

const KEY_BINDINGS: Record<string, Intent> = {
  s: Intent.Sit,
  w: Intent.Wave,
  p: Intent.Pat,
  l: Intent.Leave,
  x: Intent.Smoke,
  arrowleft: Intent.MoveLeft,
  arrowright: Intent.MoveRight,
};

export class InputSystem {
  private game: Game;
  private active = false;
  private activeScene: BaseScene | null = null;

  private movementState = {
    left: false,
    right: false,
  };

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
    const intent = KEY_BINDINGS[event.key.toLowerCase()];

    if (!intent) {
      return;
    }

    switch (intent) {
      case Intent.MoveLeft:
        this.movementState.left = false;
        this.updateMovement();
        break;
      case Intent.MoveRight:
        this.movementState.right = false;
        this.updateMovement();
        break;
    }
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
      case Intent.MoveLeft:
        this.movementState.left = true;
        this.updateMovement();
        break;
      case Intent.MoveRight:
        this.movementState.right = true;
        this.updateMovement();
        break;
    }
  }

  private updateMovement() {
    let direction: MovementDirection | null = null;

    if (this.movementState.left) {
      direction = "left";
    } else if (this.movementState.right) {
      direction = "right";
    }

    if (direction) {
      this.game.movePlayer(direction);
    } else {
      this.game.stopPlayerMovement();
    }
  }

  destroy(): void {
    this.deactivate();
  }
}
