import {
  AnimatedSprite,
  Assets,
  Container,
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
    sitting: [],
    sitting_smoking: [],
    standing_smoking: [],
  },
  meta: {
    image: "player-spritesheet.png",
    size: { w: 1440, h: 720 },
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
        this.sprite.animationSpeed = 0.05;
        break;
      case "walking":
        this.sprite.animationSpeed = 0.11;
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
