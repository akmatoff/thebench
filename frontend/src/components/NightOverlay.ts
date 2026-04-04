import { Container, Graphics } from "pixi.js";
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
        brightness: 1,
      }),
    ];

    this.zIndex = 50;
  }

  private drawOverlay(): void {
    this.graphics.clear();

    this.graphics.rect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.graphics.fill({
      color: 0x172973,
      alpha: 0.7,
    });
  }

  resize(width: number, height: number): void {
    this.drawOverlay();
  }
}
