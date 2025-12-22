import { ColorMatrixFilter, Container, Graphics, Ticker } from "pixi.js";
import { Bench } from "../components/bench";
import { BaseScene } from "../core/BaseScene";
import { Ground } from "../components/ground";
import { StreetLamp } from "../components/StreetLamp";
import { Sky } from "../components/Sky";

export class ParkScene extends BaseScene {
  private bench!: Bench;
  private nightFilter!: ColorMatrixFilter;
  private nightOverlay!: Graphics;

  private streetLamp!: StreetLamp;
  private sky!: Sky;
  async init() {
    this.sky = new Sky(this.game.app.screen.width, this.game.app.screen.height);

    this.container.addChild(this.sky);

    const ground = new Ground(this.game.app.screen.width);
    ground.position.set(0, this.game.app.screen.height);

    this.container.addChild(ground);

    this.bench = new Bench();
    this.bench.position.x = this.game.app.screen.width / 2;
    this.bench.position.y =
      this.game.app.screen.height / 2 + this.bench.height / 2;

    this.container.addChild(this.bench);

    this.streetLamp = new StreetLamp();
    this.streetLamp.position.x = this.bench.position.x - this.bench.width;
    this.streetLamp.position.y = this.bench.position.y - this.bench.height + 48;

    this.container.addChild(this.streetLamp);

    this.nightFilter = new ColorMatrixFilter();
    this.applyNight();
    this.container.filters = [this.nightFilter];
  }

  private applyNight() {
    this.nightFilter.reset();

    this.nightFilter.saturate(-0.2);
    this.nightFilter.brightness(0.9, false);

    this.nightOverlay = new Graphics();
    this.nightOverlay
      .rect(0, 0, this.game.app.screen.width, this.game.app.screen.height)
      .fill("#f7892f0e");
    this.nightOverlay.zIndex = 9999;
    this.container.addChild(this.nightOverlay);
  }

  update(ticker: Ticker) {
    this.streetLamp.update(ticker);
    this.sky.update(ticker);
  }
}
