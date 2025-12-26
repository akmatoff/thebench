import { Application, Ticker } from "pixi.js";
import { BaseScene } from "./BaseScene";
import { AudioManager } from "./AudioManager";
import { GameState } from "./GameState";
import { GameSocket } from "./GameSocket";
import { WS_URL } from "../config";
import { Action } from "../types/game";

export class Game {
  public app: Application;
  private currentScene: BaseScene | null = null;
  public audio: AudioManager;

  public readonly state: GameState;
  private socket: GameSocket;

  constructor(app: Application, audio: AudioManager) {
    this.app = app;
    this.audio = audio;

    this.state = new GameState();
    this.socket = new GameSocket(this.state, WS_URL);
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

  destroy(): void {
    this.app.ticker.remove(this.update, this);
    this.currentScene?.destroy();
    this.socket.destroy();
  }
}
