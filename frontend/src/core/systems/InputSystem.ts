import { Intent } from "../../types/game";
import { MovementDirection } from "../../types/player";
import { BaseScene } from "../BaseScene";
import { Game } from "../Game";

const KEY_BINDINGS: Partial<Record<KeyboardEvent["code"], Intent>> = {
  Space: Intent.Sit,
  KeyX: Intent.Smoke,
  KeyV: Intent.TakeDrag,
  ArrowLeft: Intent.MoveLeft,
  ArrowRight: Intent.MoveRight,
  KeyA: Intent.MoveLeft,
  KeyD: Intent.MoveRight,
};

const PREVENT_DEFAULT_KEYS = new Set<KeyboardEvent["code"]>(["Space", "KeyX"]);

export class InputSystem {
  private readonly game: Game;
  private active = false;

  private movementState = {
    left: false,
    right: false,
  };

  private lastDirection: MovementDirection | null = null;

  constructor(game: Game) {
    this.game = game;
  }

  activate(_scene: BaseScene): void {
    if (this.active) return;

    this.active = true;

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  deactivate(): void {
    if (!this.active) return;

    this.active = false;
    this.resetMovementState();

    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  destroy(): void {
    this.deactivate();
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.active || !this.game.state.snapshot) return;

    const intent = KEY_BINDINGS[event.code];
    if (!intent) return;

    if (PREVENT_DEFAULT_KEYS.has(event.code)) {
      event.preventDefault();
    }

    if (event.repeat && !this.isMovementIntent(intent)) {
      return;
    }

    this.handleIntent(intent);
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (!this.active) return;

    const intent = KEY_BINDINGS[event.code];
    if (!intent || !this.isMovementIntent(intent)) return;

    this.setMovementIntent(intent, false);
    this.updateMovement();
  };

  private handleIntent(intent: Intent): void {
    switch (intent) {
      case Intent.Sit:
        this.game.sitOnTheBench();
        return;

      case Intent.Smoke:
        this.toggleSmoking();
        return;

      case Intent.TakeDrag:
        this.takeDrag();
        return;

      case Intent.MoveLeft:
      case Intent.MoveRight:
        this.setMovementIntent(intent, true);
        this.updateMovement();
        return;
    }
  }

  private toggleSmoking(): void {
    const currentPlayer = this.game.getCurrentPlayerState();
    const isSmoking =
      currentPlayer?.state === "standing_smoking" ||
      currentPlayer?.state === "sitting_smoking";

    if (isSmoking) {
      this.game.sendAction("stop_smoking");
      return;
    }

    this.game.audio.playLighter();
    this.game.sendAction("smoke");
  }

  private takeDrag(): void {
    if (!this.game.canPlayerTakeDrag()) return;

    const playerSprite = this.game.playerSystem.getPlayer(this.game.playerId!);
    playerSprite?.takeDrag();

    this.game.audio.playCigaretteDrag();
    this.game.sendAction("take_drag");
  }

  private setMovementIntent(
    intent: Intent.MoveLeft | Intent.MoveRight,
    active: boolean
  ): void {
    if (intent === Intent.MoveLeft) {
      this.movementState.left = active;
      return;
    }

    this.movementState.right = active;
  }

  private updateMovement(): void {
    const direction = this.getMovementDirection();

    if (direction) {
      this.game.movePlayer(direction);
    } else {
      this.game.stopPlayerMovement();
    }

    if (direction === this.lastDirection) {
      return;
    }

    if (this.lastDirection === "right") {
      this.game.sendAction("move_right_stop");
    } else if (this.lastDirection === "left") {
      this.game.sendAction("move_left_stop");
    }

    if (direction === "right") {
      this.game.sendAction("move_right_start");
    } else if (direction === "left") {
      this.game.sendAction("move_left_start");
    }

    this.lastDirection = direction;
  }

  private getMovementDirection(): MovementDirection | null {
    if (this.movementState.left && !this.movementState.right) {
      return "left";
    }

    if (this.movementState.right && !this.movementState.left) {
      return "right";
    }

    return null;
  }

  private resetMovementState(): void {
    if (this.lastDirection === "left") {
      this.game.sendAction("move_left_stop");
    } else if (this.lastDirection === "right") {
      this.game.sendAction("move_right_stop");
    }

    this.movementState.left = false;
    this.movementState.right = false;
    this.lastDirection = null;

    this.game.stopPlayerMovement();
  }

  private isMovementIntent(
    intent: Intent
  ): intent is Intent.MoveLeft | Intent.MoveRight {
    return intent === Intent.MoveLeft || intent === Intent.MoveRight;
  }
}
