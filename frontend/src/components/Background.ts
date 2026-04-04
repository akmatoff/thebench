import {
  AnimatedSprite,
  Assets,
  Container,
  Spritesheet,
  SpritesheetData,
  Texture,
} from "pixi.js";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../core/Game";

export class Background extends Container {
  sprite!: AnimatedSprite;

  constructor() {
    super();
    void this.init();
  }

  async init() {
    const frames: Texture[] = [];

    for (let i = 1; i <= 11; i++) {
      frames.push(Assets.get(`bg${i}`));
    }

    this.sprite = new AnimatedSprite(frames);
    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.1;
    this.sprite.anchor.set(0, 0);
    this.sprite.position.set(0, 0);
    this.sprite.width = WORLD_WIDTH;
    this.sprite.height = WORLD_HEIGHT;

    this.addChild(this.sprite);
    this.sprite.play();
  }

  resize(width: number, height: number) {
    this.sprite.width = width;
    this.sprite.height = height;
  }
}
