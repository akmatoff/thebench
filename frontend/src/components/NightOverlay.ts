import { Container, Graphics, NoiseFilter } from "pixi.js";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../core/Game";
import { AdjustmentFilter } from "pixi-filters";

export class NightOverlay extends Container {
  private graphics: Graphics;

  constructor() {
    super();

    this.graphics = new Graphics();
    this.addChild(this.graphics);

    this.drawOverlay();

    this.filters = [
      new AdjustmentFilter({
        brightness: 0.6,
      }),
    ];

    this.zIndex = 50;
  }

  private drawOverlay(): void {
    this.graphics.clear();

    this.graphics.rect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.graphics.fill({
      color: 0x0d1d4f,
      alpha: 0.82,
    });
  }

  resize(width: number, height: number): void {
    this.drawOverlay();
  }
}
