import { Container } from "pixi.js";
import { GameState } from "../GameState";
import { Game, WORLD_HEIGHT } from "../Game";
import { MovementDirection } from "../../types/player";
import { GameStateSnapshot } from "../../types/messages";
import { Player } from "../../components/Player";

export const PLAYER_Y_OFFSET = 220;

export class PlayerSystem {
  private sceneContainer: Container | null = null;
  private gameState: GameState;
  private game: Game;

  private currentMovementDirection: MovementDirection | null = null;
  private movementSpeed = 1;

  private players: Map<string, Player> = new Map();

  constructor(game: Game) {
    this.gameState = game.state;
    this.game = game;

    this.gameState.setOnUpdate(this.onStateUpdate.bind(this));
  }

  onStateUpdate(snapshot: GameStateSnapshot): void {
    if (!this.sceneContainer) return;

    this.syncPlayers(snapshot);
  }

  syncPlayers(snapshot: GameStateSnapshot): void {
    const players = snapshot.players;

    // Remove player if not in snapshot
    for (const [id, player] of this.players) {
      if (!players[id]) {
        this.removePlayer(id);
      }
    }

    for (const [id, player] of Object.entries(players)) {
      let playerSprite = this.players.get(id);

      // Initial player, create player sprite and sync positions
      if (!playerSprite) {
        playerSprite = new Player();
        this.players.set(id, playerSprite);
        this.sceneContainer!.addChild(playerSprite);

        playerSprite.position.y =
          WORLD_HEIGHT - playerSprite.height - PLAYER_Y_OFFSET;

        if (player.position) {
          playerSprite.x = player.position.x;
        }
      }

      playerSprite.setAnimation(player.state);
      playerSprite.setFacing(player.facing);

      if (player.role === "sitter") {
        playerSprite.position.x = player.position.x;
      }

      if (id !== this.game.playerId) {
        playerSprite.x = player.position.x;
      }
    }
  }

  setSceneContainer(container: Container): void {
    this.sceneContainer = container;
  }

  setMovementDirection(direction: MovementDirection): void {
    this.currentMovementDirection = direction;
  }

  stopMovement(): void {
    this.currentMovementDirection = null;
  }

  updateMovement(delta: number): void {
    if (!this.currentMovementDirection || !this.sceneContainer) return;

    const playerId = this.game.playerId;

    if (!playerId) return;

    const player = this.players.get(playerId);

    if (!player) return;

    const currentPlayer = this.game.getCurrentPlayerState();

    if (
      currentPlayer?.state === "sitting" ||
      currentPlayer?.role === "sitter"
    ) {
      return;
    }

    switch (this.currentMovementDirection) {
      case "left":
        player.x -= this.movementSpeed * delta;
        this.game.sendAction("move_left");
        break;
      case "right":
        player.x += this.movementSpeed * delta;
        this.game.sendAction("move_right");
        break;
    }

    if (player.x + player.width / 2 < 0) player.x = 0 - player.width / 2;
    if (player.x > this.sceneContainer.width)
      player.x = this.sceneContainer.width - player.width / 2;
  }

  removePlayer(id: string): void {
    const player = this.players.get(id);

    if (player) {
      player.destroy();
      this.players.delete(id);
    }
  }

  getPlayer(id: string) {
    const player = this.players.get(id);

    if (!player) return;

    return player;
  }

  onResize(): void {
    for (const player of this.players.values()) {
      player.position.y = window.innerHeight - PLAYER_Y_OFFSET;
    }
  }
}
