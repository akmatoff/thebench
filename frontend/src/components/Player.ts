import {
  AnimatedSprite,
  Assets,
  Container,
  Spritesheet,
  SpritesheetData,
} from "pixi.js";

import textureUrl from "../assets/sprites/player-spritesheet.png";

const spritesheetData: SpritesheetData = {
  frames: {
    idle1: { frame: { x: 0, y: 0, w: 512, h: 512 } },
    idle2: { frame: { x: 512, y: 0, w: 512, h: 512 } },
    idle3: { frame: { x: 1024, y: 0, w: 512, h: 512 } },
  },
  animations: {
    idle: ["idle1", "idle2", "idle3"],
  },
  meta: {
    image: textureUrl,
    size: { w: 1536, h: 512 },
    scale: 0,
  },
};

const texture = await Assets.load(spritesheetData.meta.image!);

export class Player extends Container {
  sprite!: AnimatedSprite;
  constructor() {
    super();

    this.init();
  }

  async init() {
    const spritesheet = new Spritesheet(texture, spritesheetData);

    await spritesheet.parse();

    this.sprite = new AnimatedSprite(spritesheet.animations.idle);

    this.sprite.animationSpeed = 0.05;
    this.sprite.loop = true;

    this.sprite.tint = "#fff1efff";

    this.sprite.play();

    this.addChild(this.sprite);
    this.position.set(0, 450);
  }

  update() {
    this.sprite.play();
  }
}
