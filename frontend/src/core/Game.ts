import { Application, Ticker } from "pixi.js";
import { BaseScene } from "./BaseScene";
import { AudioManager } from "./AudioManager";
import { GameState } from "./GameState";
import { GameSocket } from "./GameSocket";
import { WS_URL } from "../config";
import { Action } from "../types/game";
import { InputSystem } from "./systems/InputSystem";
import { MovementDirection } from "../types/player";
import { PlayerSystem } from "./systems/PlayerSystem";

export class Game {
  public app: Application;
  private currentScene: BaseScene | null = null;
  public audio: AudioManager;

  public readonly state: GameState;
  public playerId: string | null = null;

  private socket: GameSocket;

  public readonly input: InputSystem;
  public readonly playerSystem: PlayerSystem;

  constructor(app: Application, audio: AudioManager) {
    this.app = app;
    this.audio = audio;

    this.state = new GameState();
    this.socket = new GameSocket(this.state, WS_URL);
    this.playerSystem = new PlayerSystem(this);

    this.socket.onConnected = (playerId) => {
      this.setPlayerId(playerId);
    };

    this.input = new InputSystem(this);
  }

  start(SceneClass: new (game: Game) => BaseScene) {
    this.currentScene = new SceneClass(this);

    this.currentScene.init();

    this.app.ticker.add(this.update, this);
  }

  private update(delta: Ticker) {
    this.currentScene?.update(delta);
  }

  sendAction(action: Action) {
    this.socket.sendAction(action);
  }

  setPlayerId(id: string) {
    this.playerId = id;
  }

  movePlayer(direction: MovementDirection) {
    this.playerSystem.setMovementDirection(direction);
  }

  stopPlayerMovement() {
    this.playerSystem.stopMovement();
  }

  getCurrentPlayerState() {
    if (!this.state.snapshot || !this.playerId) return;
    return this.state.snapshot.players[this.playerId];
  }

  destroy(): void {
    this.app.ticker.remove(this.update, this);
    this.currentScene?.destroy();
    this.socket.destroy();
    this.input.destroy();
  }
}
