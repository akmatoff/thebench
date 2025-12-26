import { Ticker } from "pixi.js";
import { Bench } from "../components/bench";
import { BaseScene } from "../core/BaseScene";
import { StreetLamp } from "../components/StreetLamp";
import { Sky } from "../components/Sky";
import { Background } from "../components/background";
import { PlayerSystem } from "../core/systems/PlayerSystem";

export class ParkScene extends BaseScene {
  private bench!: Bench;
  private background!: Background;

  private streetLamp!: StreetLamp;
  private sky!: Sky;

  private playerSystem!: PlayerSystem;

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

    this.container.filters = [];

    this.playerSystem = new PlayerSystem(this.game, this.container);
  }

  update(ticker: Ticker) {
    this.streetLamp.update(ticker);
    this.sky.update(ticker);
    this.playerSystem.onStateUpdate(this.game.state.snapshot!);
  }
}
