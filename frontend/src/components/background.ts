import { Assets, Sprite } from "pixi.js";

import textureUrl from "../assets/sprites/bg-landscape.png";

const texture = await Assets.load(textureUrl);

export class Background extends Sprite {
  constructor(height: number) {
    super();

    this.texture = texture;
    this.height = height;
    this.width = window.innerWidth;

    this.position.set(0, 0);
  }
}
