import { ColorMatrixFilter, Graphics, Ticker } from "pixi.js";
import { Bench } from "../components/bench";
import { BaseScene } from "../core/BaseScene";
import { Ground } from "../components/ground";

export class ParkScene extends BaseScene {
  private bench!: Bench;
  private nightFilter!: ColorMatrixFilter;
  private nightOverlay: Graphics;

  async init() {
    this.bench = new Bench();
    this.bench.position.x = this.game.app.screen.width / 2;
    this.bench.position.y = this.game.app.screen.height / 2 + 100;

    this.container.addChild(this.bench);

    const ground = new Ground(this.game.app.screen.width);
    ground.position.set(0, this.game.app.screen.height);

    this.container.addChild(ground);

    this.nightFilter = new ColorMatrixFilter();
    this.applyNight();
    this.container.filters = [this.nightFilter];
  }

  private applyNight() {
    this.nightFilter.reset();

    this.nightFilter.brightness(0.2, false);
    this.nightFilter.saturate(-0.3, false);
    this.nightFilter.contrast(0.08, false);

    this.nightOverlay = new Graphics();
    this.nightOverlay
      .rect(0, 0, this.game.app.screen.width, this.game.app.screen.height)
      .fill("#090e1f85");
    this.nightOverlay.zIndex = 9999;
    this.container.addChild(this.nightOverlay);
  }

  update(delta: Ticker) {}
}
