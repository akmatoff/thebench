import {
  AnimatedSprite,
  Assets,
  Container,
  Spritesheet,
  SpritesheetData,
  Texture,
} from "pixi.js";

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
  },
  meta: {
    image: "player-spritesheet.png",
    size: { w: 1440, h: 720 },
    scale: 0,
  },
};

export class Player extends Container {
  sprite!: AnimatedSprite;
  private currentAnimation: "idle" | "walking" = "idle";
  private spritesheet!: Spritesheet;
  constructor() {
    super();

    this.init();
  }

  async init() {
    const texture = Assets.get("player");

    this.spritesheet = new Spritesheet(texture, spritesheetData);

    await this.spritesheet.parse();

    this.sprite = new AnimatedSprite(this.spritesheet.animations.idle);

    this.sprite.loop = true;

    this.addChild(this.sprite);
    this.position.set(0, 580);

    this.setAnimation("idle");
  }

  setAnimation(name: "idle" | "walking") {
    if (this.currentAnimation === name) {
      return;
    }

    const frames = this.spritesheet.animations[name];

    if (!frames) {
      console.warn("No frames found for animation:", name);
      return;
    }

    const textures: Texture[] = frames.map((frame) => {
      if (!frame) {
        console.error("Frame is null:", frame);
      }
      return frame;
    });

    this.sprite.textures = textures;
    this.sprite.animationSpeed = name === "walking" ? 0.09 : 0.5;

    if (!this.sprite.playing) {
      this.sprite.gotoAndPlay(0);
    }

    this.currentAnimation = name;
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
