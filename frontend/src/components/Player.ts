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

    standingDragging1: { frame: { x: 0, y: 2160, w: 240, h: 360 } },
    standingDragging2: { frame: { x: 240, y: 2160, w: 240, h: 360 } },
    standingDragging3: { frame: { x: 480, y: 2160, w: 240, h: 360 } },
    standingDragging4: { frame: { x: 720, y: 2160, w: 240, h: 360 } },
    standingDragging5: { frame: { x: 960, y: 2160, w: 240, h: 360 } },
    standingDragging6: { frame: { x: 1200, y: 2160, w: 240, h: 360 } },
    standingDragging7: { frame: { x: 1440, y: 2160, w: 240, h: 360 } },
    standingDragging8: { frame: { x: 1680, y: 2160, w: 240, h: 360 } },
    standingDragging9: { frame: { x: 1920, y: 2160, w: 240, h: 360 } },
    standingDragging10: { frame: { x: 2160, y: 2160, w: 240, h: 360 } },
    standingDragging11: { frame: { x: 2400, y: 2160, w: 240, h: 360 } },
    standingDragging12: { frame: { x: 2640, y: 2160, w: 240, h: 360 } },
    standingDragging13: { frame: { x: 2880, y: 2160, w: 240, h: 360 } },
    standingDragging14: { frame: { x: 3120, y: 2160, w: 240, h: 360 } },
    standingDragging15: { frame: { x: 3360, y: 2160, w: 240, h: 360 } },
    standingDragging16: { frame: { x: 3600, y: 2160, w: 240, h: 360 } },
    standingDragging17: { frame: { x: 3840, y: 2160, w: 240, h: 360 } },
    standingDragging18: { frame: { x: 4080, y: 2160, w: 240, h: 360 } },

    sittingDragging1: { frame: { x: 0, y: 2520, w: 240, h: 360 } },
    sittingDragging2: { frame: { x: 240, y: 2520, w: 240, h: 360 } },
    sittingDragging3: { frame: { x: 480, y: 2520, w: 240, h: 360 } },
    sittingDragging4: { frame: { x: 720, y: 2520, w: 240, h: 360 } },
    sittingDragging5: { frame: { x: 960, y: 2520, w: 240, h: 360 } },
    sittingDragging6: { frame: { x: 1200, y: 2520, w: 240, h: 360 } },
    sittingDragging7: { frame: { x: 1440, y: 2520, w: 240, h: 360 } },
    sittingDragging8: { frame: { x: 1680, y: 2520, w: 240, h: 360 } },
    sittingDragging9: { frame: { x: 1920, y: 2520, w: 240, h: 360 } },
    sittingDragging10: { frame: { x: 2160, y: 2520, w: 240, h: 360 } },
    sittingDragging11: { frame: { x: 2400, y: 2520, w: 240, h: 360 } },
    sittingDragging12: { frame: { x: 2640, y: 2520, w: 240, h: 360 } },
    sittingDragging13: { frame: { x: 2880, y: 2520, w: 240, h: 360 } },
    sittingDragging14: { frame: { x: 3120, y: 2520, w: 240, h: 360 } },
    sittingDragging15: { frame: { x: 3360, y: 2520, w: 240, h: 360 } },
    sittingDragging16: { frame: { x: 3600, y: 2520, w: 240, h: 360 } },
    sittingDragging17: { frame: { x: 3840, y: 2520, w: 240, h: 360 } },
    sittingDragging18: { frame: { x: 4080, y: 2520, w: 240, h: 360 } },
    sittingDragging19: { frame: { x: 4320, y: 2520, w: 240, h: 360 } },
    sittingDragging20: { frame: { x: 4560, y: 2520, w: 240, h: 360 } },
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
    standing_dragging: [
      "standingDragging1",
      "standingDragging2",
      "standingDragging3",
      "standingDragging4",
      "standingDragging5",
      "standingDragging6",
      "standingDragging7",
      "standingDragging8",
      "standingDragging9",
      "standingDragging10",
      "standingDragging11",
      "standingDragging12",
      "standingDragging13",
      "standingDragging14",
      "standingDragging15",
      "standingDragging16",
      "standingDragging17",
      "standingDragging18",
    ],
    sitting_dragging: [
      "sittingDragging1",
      "sittingDragging2",
      "sittingDragging3",
      "sittingDragging4",
      "sittingDragging5",
      "sittingDragging6",
      "sittingDragging7",
      "sittingDragging8",
      "sittingDragging9",
      "sittingDragging10",
      "sittingDragging11",
      "sittingDragging12",
      "sittingDragging13",
      "sittingDragging14",
      "sittingDragging15",
      "sittingDragging16",
      "sittingDragging17",
      "sittingDragging18",
    ],
  },
  meta: {
    image: "player-spritesheet.png",
    size: { w: 4800, h: 2880 },
    scale: 1,
  },
};

export class Player extends Container {
  sprite!: AnimatedSprite;
  private currentAnimation: PlayerState = "idle";
  private spritesheet!: Spritesheet;
  private animationTextures: Record<string, Texture[]> = {};

  facing: PlayerFacing = "right";

  isTakingDrag = false;
  isDragCooldown = false;

  private readonly DRAG_COOLDOWN_MS = 500;

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

  canTakeDrag(): boolean {
    if (this.isTakingDrag || this.isDragCooldown) {
      return false;
    }

    const isSittingSmoking = this.currentAnimation === "sitting_smoking";
    const isStandingSmoking = this.currentAnimation === "standing_smoking";
    const isWalkingSmoking = this.currentAnimation === "walking_smoking";

    return isSittingSmoking || isStandingSmoking || isWalkingSmoking;
  }

  takeDrag(): boolean {
    if (!this.canTakeDrag()) {
      return false;
    }

    const isSittingSmoking = this.currentAnimation === "sitting_smoking";

    const dragState = isSittingSmoking
      ? "sitting_dragging"
      : "standing_dragging";

    const textures = this.animationTextures[dragState];
    if (!textures?.length) {
      console.warn("No drag textures for state:", dragState);
      return false;
    }

    this.isTakingDrag = true;

    this.sprite.textures = textures;
    this.sprite.loop = false;
    this.sprite.animationSpeed = 0.1;
    this.sprite.gotoAndPlay(0);

    this.sprite.onComplete = () => {
      this.onDragComplete();
    };

    this.isDragCooldown = true;

    setTimeout(() => {
      this.isDragCooldown = false;
    }, this.DRAG_COOLDOWN_MS);

    return true;
  }

  private onDragComplete() {
    this.isTakingDrag = false;
    this.sprite.onComplete = undefined;

    this.sprite.loop = true;

    const textures = this.animationTextures[this.currentAnimation];
    if (textures?.length) {
      this.sprite.textures = textures;
      this.sprite.loop = true;

      switch (this.currentAnimation) {
        case "idle":
        case "sitting":
          this.sprite.animationSpeed = 0.03;
          break;
        case "walking":
          this.sprite.animationSpeed = 0.11;
          break;
        default:
          this.sprite.animationSpeed = 0.1;
      }

      this.sprite.gotoAndPlay(0);

      console.log("Drag complete");
      console.log(this.currentAnimation);
    }
  }

  update() {
    this.sprite.play();
  }
}
