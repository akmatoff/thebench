import { Assets, Sprite } from "pixi.js";

export class Bench extends Sprite {
  constructor() {
    const texture = Assets.get("bench");

    super(texture);

    this.scale.set(1.5);
    this.anchor.set(0.5);

    this.width = 256;
    this.height = 256;

    this.tint = "#e0806fff";

    this.filters = [];
  }
}
