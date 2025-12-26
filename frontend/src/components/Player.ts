import { AnimatedSprite, Assets } from "pixi.js";

import textureUrl from "../assets/sprites/player-spritesheet.png";

const texture = await Assets.load(textureUrl);

export class Player extends AnimatedSprite {
  constructor() {
    super(texture);

    this.position.set(0, 450);
  }
}
