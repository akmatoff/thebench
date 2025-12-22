import { Assets, Container, Sprite, Ticker } from "pixi.js";
import { GlowFilter } from "pixi-filters";

import baseTextureSrc from "../assets/sprites/street-lamp.png";
import bulbTextureSrc from "../assets/sprites/street-lamp-bulb.png";

const baseTexture = await Assets.load(baseTextureSrc);
const bulbTexture = await Assets.load(bulbTextureSrc);

export class StreetLamp extends Container {
  private base: Sprite;
  private bulb: Sprite;
  private glowFilter: GlowFilter;

  constructor() {
    super();
    this.base = new Sprite(baseTexture);
    this.bulb = new Sprite(bulbTexture);
    this.addChild(this.base);
    this.addChild(this.bulb);

    this.bulb.tint = "#ffe18eff";
    this.base.tint = "#393e81ff";

    this.scale.set(1.3);

    this.glowFilter = new GlowFilter({
      distance: 4,
      outerStrength: 16,
      innerStrength: 0,
      quality: 0.5,
      color: "#ffe0b8ff",
    });

    this.bulb.filters = [this.glowFilter];
  }

  update(ticker: Ticker) {}
}
