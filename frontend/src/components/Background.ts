import { Assets, Sprite } from "pixi.js";

export class Background extends Sprite {
  constructor(height: number) {
    super();

    const texture = Assets.get("background");

    this.texture = texture;
    this.height = height;
    this.width = window.innerWidth;

    this.position.set(0, 0);
  }
}
