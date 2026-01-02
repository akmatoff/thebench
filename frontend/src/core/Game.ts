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
import { Viewport } from "pixi-viewport";

export const WORLD_WIDTH = 2048;
export const WORLD_HEIGHT = window.innerHeight;

export class Game {
  public app: Application;
  private currentScene: BaseScene | null = null;
  public audio: AudioManager;

  public readonly state: GameState;
  public playerId: string | null = null;

  private socket: GameSocket;

  public readonly input: InputSystem;
  public readonly playerSystem: PlayerSystem;

  public viewport: Viewport;

  constructor(app: Application, audio: AudioManager, viewport: Viewport) {
    this.app = app;
    this.audio = audio;
    this.viewport = viewport;

    this.state = new GameState();
    this.socket = new GameSocket(this.state, WS_URL);
    this.playerSystem = new PlayerSystem(this);

    this.socket.onConnected = (playerId) => {
      this.setPlayerId(playerId);
    };

    this.input = new InputSystem(this);

    window.addEventListener("resize", this.onResize);

    this.onResize();
  }

  start(SceneClass: new (game: Game) => BaseScene) {
    this.currentScene = new SceneClass(this);

    this.currentScene.init();

    this.viewport.addChild(this.currentScene.container);

    this.app.ticker.add(this.update, this);
  }

  private update(delta: Ticker) {
    this.currentScene?.update(delta);
    this.playerSystem.updateMovement(delta.deltaTime);

    if (this.state.snapshot) {
      this.playerSystem.onStateUpdate(this.state.snapshot);
    }

    this.followPlayer();
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

  followPlayer(): void {
    const player = this.playerSystem.getPlayer(this.playerId!);

    if (!player) return;

    this.viewport.moveCenter(player.x, this.viewport.center.y);
  }

  getCurrentPlayerState() {
    if (!this.state.snapshot || !this.playerId) return;
    return this.state.snapshot.players[this.playerId];
  }

  private onResize = () => {
    this.app.resize();

    this.viewport.resize(window.innerWidth, window.innerHeight);

    this.currentScene?.onResize?.();
    this.playerSystem.onResize();
  };

  destroy(): void {
    window.removeEventListener("resize", this.onResize);
    this.app.ticker.remove(this.update, this);
    this.currentScene?.destroy();
    this.socket.destroy();
    this.input.destroy();
  }
}
