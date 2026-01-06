import {
  AnimatedSprite,
  Assets,
  BlurFilter,
  Container,
  Graphics,
  Spritesheet,
  SpritesheetData,
  Texture,
} from "pixi.js";
import { PlayerFacing, PlayerState } from "../types/player";

const spritesheetData: SpritesheetData = {
  frames: {
    idle1: { frame: { x: 0, y: 0, w: 240, h: 360 } },
    idle2: { frame: { x: 240, y: 0, w: 240, h: 360 } },

    walking1: { frame: { x: 0, y: 360, w: 240, h: 360 } },
    walking2: { frame: { x: 240, y: 360, w: 240, h: 360 } },
    walking3: { frame: { x: 480, y: 360, w: 240, h: 360 } },
    walking4: { frame: { x: 720, y: 360, w: 240, h: 360 } },
    walking5: { frame: { x: 960, y: 360, w: 240, h: 360 } },
    walking6: { frame: { x: 1200, y: 360, w: 240, h: 360 } },

    sitting1: { frame: { x: 0, y: 1080, w: 240, h: 360 } },
    sitting2: { frame: { x: 240, y: 1080, w: 240, h: 360 } },

    standingSmoking1: { frame: { x: 0, y: 720, w: 240, h: 360 } },
    standingSmoking2: { frame: { x: 240, y: 720, w: 240, h: 360 } },
    standingSmoking3: { frame: { x: 480, y: 720, w: 240, h: 360 } },
    standingSmoking4: { frame: { x: 720, y: 720, w: 240, h: 360 } },
    standingSmoking5: { frame: { x: 960, y: 720, w: 240, h: 360 } },
    standingSmoking6: { frame: { x: 1200, y: 720, w: 240, h: 360 } },
    standingSmoking7: { frame: { x: 1440, y: 720, w: 240, h: 360 } },
    standingSmoking8: { frame: { x: 1680, y: 720, w: 240, h: 360 } },
    standingSmoking9: { frame: { x: 1920, y: 720, w: 240, h: 360 } },
    standingSmoking10: { frame: { x: 2160, y: 720, w: 240, h: 360 } },
    standingSmoking11: { frame: { x: 2400, y: 720, w: 240, h: 360 } },
    standingSmoking12: { frame: { x: 2640, y: 720, w: 240, h: 360 } },

    sittingSmoking1: { frame: { x: 0, y: 1440, w: 240, h: 360 } },
    sittingSmoking2: { frame: { x: 240, y: 1440, w: 240, h: 360 } },
    sittingSmoking3: { frame: { x: 480, y: 1440, w: 240, h: 360 } },
    sittingSmoking4: { frame: { x: 720, y: 1440, w: 240, h: 360 } },
    sittingSmoking5: { frame: { x: 960, y: 1440, w: 240, h: 360 } },
    sittingSmoking6: { frame: { x: 1200, y: 1440, w: 240, h: 360 } },
    sittingSmoking7: { frame: { x: 1440, y: 1440, w: 240, h: 360 } },
    sittingSmoking8: { frame: { x: 1680, y: 1440, w: 240, h: 360 } },
    sittingSmoking9: { frame: { x: 1920, y: 1440, w: 240, h: 360 } },
    sittingSmoking10: { frame: { x: 2160, y: 1440, w: 240, h: 360 } },
    sittingSmoking11: { frame: { x: 2400, y: 1440, w: 240, h: 360 } },
    sittingSmoking12: { frame: { x: 2640, y: 1440, w: 240, h: 360 } },

    walkingSmoking1: { frame: { x: 0, y: 1800, w: 240, h: 360 } },
    walkingSmoking2: { frame: { x: 240, y: 1800, w: 240, h: 360 } },
    walkingSmoking3: { frame: { x: 480, y: 1800, w: 240, h: 360 } },
    walkingSmoking4: { frame: { x: 720, y: 1800, w: 240, h: 360 } },
    walkingSmoking5: { frame: { x: 960, y: 1800, w: 240, h: 360 } },
    walkingSmoking6: { frame: { x: 1200, y: 1800, w: 240, h: 360 } },
  },
  animations: {
    idle: ["idle1", "idle2"],
    walking: [
      "walking1",
      "walking2",
      "walking3",
      "walking4",
      "walking5",
      "walking6",
    ],
    walking_smoking: [
      "walkingSmoking1",
      "walkingSmoking2",
      "walkingSmoking3",
      "walkingSmoking4",
      "walkingSmoking5",
      "walkingSmoking6",
    ],
    sitting: ["sitting1", "sitting2"],
    sitting_smoking: [
      "sittingSmoking1",
      "sittingSmoking2",
      "sittingSmoking3",
      "sittingSmoking4",
      "sittingSmoking5",
      "sittingSmoking6",
      "sittingSmoking7",
      "sittingSmoking8",
      "sittingSmoking9",
      "sittingSmoking10",
      "sittingSmoking11",
      "sittingSmoking12",
    ],
    standing_smoking: [
      "standingSmoking1",
      "standingSmoking2",
      "standingSmoking3",
      "standingSmoking4",
      "standingSmoking5",
      "standingSmoking6",
      "standingSmoking7",
      "standingSmoking8",
      "standingSmoking9",
      "standingSmoking10",
      "standingSmoking11",
      "standingSmoking12",
    ],
  },
  meta: {
    image: "player-spritesheet.png",
    size: { w: 2880, h: 1440 },
    scale: 1,
  },
};

export class Player extends Container {
  sprite!: AnimatedSprite;
  private currentAnimation: PlayerState = "idle";
  private spritesheet!: Spritesheet;
  private animationTextures: Record<string, Texture[]> = {};

  facing: PlayerFacing = "right";

  constructor() {
    super();

    this.init();
  }

  get currentAnimationFrame(): number {
    return this.sprite.currentFrame;
  }

  async init() {
    const texture = Assets.get("player");

    this.spritesheet = new Spritesheet(texture, spritesheetData);

    await this.spritesheet.parse();

    for (const [name, frames] of Object.entries(spritesheetData.animations!)) {
      if (frames.length === 0) {
        // Skip empty animations
        this.animationTextures[name] = [];
        continue;
      }

      this.animationTextures[name] = frames.map(
        (name) => this.spritesheet.textures[name]
      );
    }

    this.sprite = new AnimatedSprite(this.animationTextures.idle);
    this.sprite.loop = true;

    this.addChild(this.sprite);
    this.sprite.anchor.set(0.5);
    this.sprite.filters = [];

    this.setAnimation("idle");
  }

  setAnimation(state: PlayerState) {
    if (this.currentAnimation === state) {
      return;
    }

    const frames = this.spritesheet.animations[state];

    if (!frames) {
      console.warn("No animation frames found for state:", state);
      return;
    }

    const textures = this.animationTextures[state];

    if (!textures) {
      console.warn("No animation textures found for state:", state);
      return;
    }

    this.sprite.textures = textures;

    switch (state) {
      case "idle":
        this.sprite.animationSpeed = 0.03;
        break;
      case "walking":
        this.sprite.animationSpeed = 0.11;
        break;
      case "sitting":
        this.sprite.animationSpeed = 0.03;
        break;
      default:
        this.sprite.animationSpeed = 0.1;
    }

    this.sprite.gotoAndPlay(0);
    this.currentAnimation = state;
  }

  setFacing(facing: PlayerFacing) {
    this.facing = facing;
    this.scale.x = facing === "left" ? -1 : 1;
  }

  idle() {
    this.setAnimation("idle");
  }

  walk() {
    this.setAnimation("walking");
  }

  update() {
    this.sprite.play();
  }
}
