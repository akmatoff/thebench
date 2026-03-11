import { NoiseFilter, Ticker } from "pixi.js";
import { Bench } from "../components/Bench";
import { BaseScene } from "../core/BaseScene";
import { StreetLamp } from "../components/StreetLamp";
import { Sky } from "../components/Sky";
import { Background } from "../components/Background";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../core/Game";
import { LanternLight, LightSource, LightSystem } from "../lights";
import { NightOverlay } from "../components/NightOverlay";
import { AdjustmentFilter } from "pixi-filters";

export const BENCH_Y_OFFSET = 140;
export const STREET_LAMP_Y_OFFSET = 250;

export class ParkScene extends BaseScene {
  private bench!: Bench;
  private background!: Background;

  private streetLamp!: StreetLamp;
  private sky!: Sky;
  private lightSystem!: LightSystem;

  private lanternLight!: LanternLight;
  private nightOverlay!: NightOverlay;

  async init() {
    this.container.sortableChildren = true;

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
      new AdjustmentFilter({
        contrast: 1.6,
        saturation: 1.1,
        brightness: 0.9,
      }),
      new NoiseFilter({
        noise: 0.03,
      }),
    ];

    this.nightOverlay = new NightOverlay();
    this.container.addChild(this.nightOverlay);

    this.lightSystem = new LightSystem(this.container);
    this.initLights();

    this.game.playerSystem.setSceneContainer(this.container);

    this.game.input.activate(this);
  }

  private initLights(): void {
    this.lanternLight = new LanternLight();
    this.lanternLight.setPosition(this.streetLamp.x, this.streetLamp.y + 80);
    this.lightSystem.addLight(this.lanternLight);
  }

  update(ticker: Ticker) {
    this.streetLamp.update(ticker);
    this.sky.update(ticker);
    this.lightSystem.update(ticker);
    this.game.playerSystem.updateMovement(ticker.deltaTime);
  }

  onResize(): void {
    const height = window.innerHeight;

    this.bench.position.y = height - BENCH_Y_OFFSET;
    this.streetLamp.position.y = height - STREET_LAMP_Y_OFFSET;

    this.background.height = height;
    this.sky.height = height;

    this.nightOverlay.resize(WORLD_WIDTH, height);
  }
}
