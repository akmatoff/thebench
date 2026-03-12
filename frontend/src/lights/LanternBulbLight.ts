import { BlurFilter, Ticker } from "pixi.js";
import { LightSource } from "./LightSource";
import { AdjustmentFilter } from "pixi-filters";

export class LanternBulbLight extends LightSource {
  constructor() {
    super({
      color: 0xbfdcff,
      radius: 26,
      alpha: 1,
      intensity: 6,
      flickerIntensity: 0.02,
      flickerSpeed: 0.9,
    });

    this.filters = [
      new BlurFilter({ strength: 16 }),
      new AdjustmentFilter({
        contrast: 1.1,
      }),
    ];
  }

  protected drawLight(): void {
    this.drawRadialGradient(this.config.radius, this.config.color, 1);
  }

  update(ticker: Ticker): void {
    super.update(ticker);
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
