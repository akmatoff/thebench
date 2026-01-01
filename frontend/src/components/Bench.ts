import { Assets, Sprite } from "pixi.js";

export class Bench extends Sprite {
  constructor() {
    const texture = Assets.get("bench");

    super(texture);

    this.anchor.set(0.5);

    this.width = 416;
    this.height = 208;

    this.scale.set(1.3);

    this.tint = "#e0806fff";

    this.filters = [];
  }
}
