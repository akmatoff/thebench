import { Assets, Container, Sprite, Ticker } from "pixi.js";
import { GlowFilter } from "pixi-filters";

export class StreetLamp extends Container {
  private base: Sprite;
  private bulb: Sprite;
  private glowFilter: GlowFilter;

  constructor() {
    super();

    const baseTexture = Assets.get("streetLamp");
    const bulbTexture = Assets.get("streetLampBulb");

    this.base = new Sprite(baseTexture);
    this.bulb = new Sprite(bulbTexture);
    this.addChild(this.base);
    this.addChild(this.bulb);

    this.base.anchor.set(0.5);
    this.bulb.anchor.set(0.5);

    this.bulb.tint = "#ffe18eff";
    this.base.tint = "#393e81ff";

    this.base.width = 64;
    this.base.height = 256;

    this.bulb.width = 64;
    this.bulb.height = 256;

    this.scale.set(1.5);

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
