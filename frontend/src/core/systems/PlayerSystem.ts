import { Container } from "pixi.js";
import { GameState } from "../GameState";
import { Game } from "../Game";
import { Player as PlayerType } from "../../types/player";
import { GameStateSnapshot } from "../../types/socket";
import { Player } from "../../components/Player";

export class PlayerSystem {
  private container: Container;
  private gameState: GameState;
  private game: Game;

  private players: Map<string, PlayerType> = new Map();

  constructor(game: Game, sceneContainer: Container) {
    this.game = game;
    this.gameState = game.state;
    this.container = sceneContainer;

    const player = new Player();

    this.container.addChild(player);

    this.gameState.setOnUpdate(this.onStateUpdate.bind(this));
  }

  onStateUpdate(snapshot: GameStateSnapshot): void {}
}
