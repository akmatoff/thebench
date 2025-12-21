import { Application, Ticker } from "pixi.js";
import { BaseScene } from "./BaseScene";

export class Game {
  public app: Application;
  private currentScene: BaseScene | null = null;

  constructor(app: Application) {
    this.app = app;
  }

  start(SceneClass: new (game: Game) => BaseScene) {
    this.currentScene = new SceneClass(this);

    this.currentScene.init();

    this.app.ticker.add(this.update, this);
  }

  private update(delta: Ticker) {
    this.currentScene?.update(delta);
  }

  destroy(): void {
    this.app.ticker.remove(this.update, this);
    this.currentScene?.destroy();
  }
}
