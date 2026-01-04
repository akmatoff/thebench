import { Intent } from "../../types/game";
import { MovementDirection } from "../../types/player";
import { BaseScene } from "../BaseScene";
import { Game } from "../Game";

const KEY_BINDINGS: Record<KeyboardEvent["code"], Intent> = {
  Space: Intent.Sit,
  KeyX: Intent.Smoke,
  ArrowLeft: Intent.MoveLeft,
  ArrowRight: Intent.MoveRight,
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

    console.log(event.code);

    const intent = KEY_BINDINGS[event.code];

    if (!intent) {
      return;
    }

    if (event.key === " " || event.key === "s" || event.key === "x") {
      event.preventDefault();
    }

    this.handleIntent(intent);
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    const intent = KEY_BINDINGS[event.code];

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
    const currentPlayer = this.game.getCurrentPlayerState();

    switch (intent) {
      case Intent.Sit:
        this.game.sitOnTheBench();
        break;
      case Intent.Smoke:
        if (
          currentPlayer?.state === "standing_smoking" ||
          currentPlayer?.state === "sitting_smoking"
        ) {
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
