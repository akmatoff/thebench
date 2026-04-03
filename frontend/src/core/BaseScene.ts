import { Container } from "pixi.js";
import { Game } from "./Game";

export abstract class BaseScene {
  public readonly container: Container = new Container();
  protected readonly game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  abstract init(): Promise<void> | void;

  abstract update(delta: number): void;

  onResize?(): void;

  destroy(): void {
    this.container.destroy({ children: true });
  }
}
