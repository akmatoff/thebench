import { BlurFilter, NoiseFilter, Ticker } from "pixi.js";
import { LightSource } from "./LightSource";
import { AdjustmentFilter, BloomFilter } from "pixi-filters";

export class LanternLight extends LightSource {
  constructor() {
    super({
      color: 0xffe573,
      radius: 900,
      radiusY: 300,
      alpha: 0.2,
      intensity: 0.15,
    });

    this.filters = [
      new BlurFilter({ strength: 60 }),
      new BloomFilter(),
      new AdjustmentFilter({
        contrast: 0.9,
      }),
      new NoiseFilter({
        noise: 0.15,
      }),
    ];
  }

  protected drawLight(): void {
    this.drawRadialGradient(this.config.radius, this.config.color, 6);
  }

  update(ticker: Ticker): void {
    super.update(ticker);
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
