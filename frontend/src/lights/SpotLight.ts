import { BlurFilter, Ticker } from "pixi.js";
import { LightSource } from "./LightSource";
import { AdjustmentFilter } from "pixi-filters";

export class SpotLight extends LightSource {
  constructor() {
    super({
      color: 0xffd95c,
      radius: 1300,
      alpha: 0.7,
      intensity: 0.06,
      flickerIntensity: 0.005,
      flickerSpeed: 0.9,
    });

    this.rotation = Math.PI / 2;

    this.filters = [
      new BlurFilter({ strengthX: 40, strengthY: 40 }),
      new AdjustmentFilter({
        contrast: 0.8,
      }),
    ];
  }

  protected drawLight(): void {
    this.drawDirectionalGradient(
      this.config.radius,
      this.config.color,
      -Math.PI / 2.5,
      Math.PI / 2.5,
      10
    );
  }

  update(delta: number): void {
    super.update(delta);
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
