import { Ticker } from "pixi.js";
import { Bench } from "../components/bench";
import { BaseScene } from "../core/BaseScene";
import { StreetLamp } from "../components/StreetLamp";
import { Sky } from "../components/Sky";
import { Background } from "../components/background";

export class ParkScene extends BaseScene {
  private bench!: Bench;
  // private nightFilter!: ColorMatrixFilter;
  // private nightOverlay!: Graphics;
  private background!: Background;

  private streetLamp!: StreetLamp;
  private sky!: Sky;

  async init() {
    this.sky = new Sky(this.game.app.screen.width, this.game.app.screen.height);

    this.container.addChild(this.sky);

    this.background = new Background(this.game.app.screen.height);

    this.container.addChild(this.background);

    this.bench = new Bench();
    this.bench.position.x = this.game.app.screen.width / 2;
    this.bench.position.y = this.game.app.screen.height - this.bench.height;

    this.container.addChild(this.bench);

    this.streetLamp = new StreetLamp();
    this.streetLamp.position.x = this.bench.position.x - this.bench.width * 1.4;
    this.streetLamp.position.y =
      this.bench.position.y - this.bench.height - 150;

    this.container.addChild(this.streetLamp);

    // this.nightFilter = new ColorMatrixFilter();
    // this.applyNight();

    this.container.filters = [];
  }

  // private applyNight() {
  //   this.nightFilter.reset();

  //   this.nightFilter.brightness(0.8, false);
  //   this.nightFilter.contrast(-0.1, false);
  //   this.nightFilter.saturate(-0.2, true);

  //   this.nightOverlay = new Graphics();
  //   this.nightOverlay
  //     .rect(0, 0, this.game.app.screen.width, this.game.app.screen.height)
  //     .fill("#3b3c4131");
  //   this.nightOverlay.zIndex = 9999;
  //   this.container.addChild(this.nightOverlay);
  // }

  update(ticker: Ticker) {
    this.streetLamp.update(ticker);
    this.sky.update(ticker);
  }
}
