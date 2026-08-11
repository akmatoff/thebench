import { NoiseFilter, Ticker } from "pixi.js";
import { Bench } from "../components/Bench";
import { BaseScene } from "../core/BaseScene";
import { StreetLamp } from "../components/StreetLamp";
import { Background } from "../components/Background";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../core/Game";
import { LanternBulbLight, SpotLight, LightSystem } from "../lights";
import { NightOverlay } from "../components/NightOverlay";
import { AdjustmentFilter } from "pixi-filters";

export const BENCH_Y_OFFSET = 140;
export const STREET_LAMP_Y_OFFSET = 250;

export class ParkScene extends BaseScene {
  private bench!: Bench;
  private background!: Background;

  private streetLamp!: StreetLamp;
  private lightSystem!: LightSystem;

  private lanternLight!: LanternBulbLight;
  private spotLight!: SpotLight;
  private nightOverlay!: NightOverlay;

  async init() {
    this.container.sortableChildren = true;

    this.background = new Background();

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
        noise: 0.03,
      }),
      new AdjustmentFilter({
        contrast: 1.5,
        saturation: 0.5,
        brightness: 1.2,
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
    this.lanternLight = new LanternBulbLight();
    this.lanternLight.setPosition(this.streetLamp.x, this.streetLamp.y - 140);
    this.lightSystem.addLight(this.lanternLight);

    this.spotLight = new SpotLight();
    this.spotLight.setPosition(this.streetLamp.x, this.streetLamp.y - 160);
    this.lightSystem.addLight(this.spotLight);
  }

  update(delta: number) {
    this.streetLamp.update(delta);
    this.lightSystem.update(delta);
    this.game.playerSystem.updateMovement(delta);
  }

  onResize(): void {
    const height = WORLD_HEIGHT;

    this.bench.position.y = height - BENCH_Y_OFFSET;
    this.streetLamp.position.y = height - STREET_LAMP_Y_OFFSET;

    this.background.height = height;

    this.nightOverlay.resize(WORLD_WIDTH, height);
  }
}
