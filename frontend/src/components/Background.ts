import { Assets, Sprite } from "pixi.js";
import { WORLD_WIDTH } from "../core/Game";

export class Background extends Sprite {
  constructor(height: number) {
    super();

    const texture = Assets.get("background");

    this.texture = texture;
    this.width = WORLD_WIDTH;
    this.height = height;

    this.position.set(0, 0);
    this.anchor.set(0, 0);
  }
}
