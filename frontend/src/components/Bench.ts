import { Assets, Sprite } from "pixi.js";

const texture = await Assets.load("/assets/the-bench.png");

export class Bench extends Sprite {
  constructor() {
    super(texture);

    this.scale.set(1.5);
    this.anchor.set(0.5);

    this.width = 256;
    this.height = 256;

    this.tint = "#e0806fff";

    this.filters = [];
  }
}
