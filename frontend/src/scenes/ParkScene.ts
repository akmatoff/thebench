import { NoiseFilter, Ticker } from "pixi.js";
import { Bench } from "../components/Bench";
import { BaseScene } from "../core/BaseScene";
import { StreetLamp } from "../components/StreetLamp";
import { Sky } from "../components/Sky";
import { Background } from "../components/Background";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../core/Game";
import {
  AdjustmentFilter,
  ColorOverlayFilter,
  MotionBlurFilter,
} from "pixi-filters";

export const BENCH_Y_OFFSET = 140;
export const STREET_LAMP_Y_OFFSET = 250;

export class ParkScene extends BaseScene {
  private bench!: Bench;
  private background!: Background;

  private streetLamp!: StreetLamp;
  private sky!: Sky;

  async init() {
    this.sky = new Sky(this.game.app.screen.width, this.game.app.screen.height);

    this.container.addChild(this.sky);

    this.background = new Background(this.game.app.screen.height);

    this.container.addChild(this.background);

    this.bench = new Bench();
    this.bench.position.set(WORLD_WIDTH / 2, WORLD_HEIGHT - BENCH_Y_OFFSET);

    this.container.addChild(this.bench);

    this.streetLamp = new StreetLamp();
    this.streetLamp.position.set(
      this.bench.position.x - this.streetLamp.width * 3,
      WORLD_HEIGHT - STREET_LAMP_Y_OFFSET
    );

    this.container.addChild(this.streetLamp);

    this.container.filters = [
      new NoiseFilter({
        noise: 0.07,
      }),
      new AdjustmentFilter({
        contrast: 0.98,
        saturation: 0.9,
      }),
      new ColorOverlayFilter({
        color: "#636363",
        alpha: 0.1,
      }),
    ];

    this.game.playerSystem.setSceneContainer(this.container);

    this.game.input.activate(this);
  }

  update(ticker: Ticker) {
    this.streetLamp.update(ticker);
    this.sky.update(ticker);
    this.game.playerSystem.updateMovement(ticker.deltaTime);
  }

  onResize(): void {
    const height = window.innerHeight;

    this.bench.position.y = height - BENCH_Y_OFFSET;
    this.streetLamp.position.y = height - STREET_LAMP_Y_OFFSET;

    this.background.height = height;
    this.sky.height = height;
  }
}
