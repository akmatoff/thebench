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

    this.bulb.tint = "#ffcd43ff";
    this.base.tint = "#393e81ff";

    this.glowFilter = new GlowFilter({
      distance: 48,
      outerStrength: 3,
      innerStrength: 24,
      quality: 0.4,
      knockout: true,
      color: "#ffe0b8ff",
    });

    this.bulb.filters = [this.glowFilter];
  }

  update(ticker: Ticker) {
    const time = ticker.deltaMS * 0.001;
    const amplitude = 3;
    const frequency = 3;

    const glowOffset = 2.6 + amplitude * Math.sin(frequency * time);
    this.glowFilter.outerStrength = glowOffset;
  }
}
