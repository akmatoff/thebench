import { Container, Graphics, Ticker } from "pixi.js";
import { WORLD_WIDTH } from "../core/Game";

export class Star extends Graphics {
  constructor(x: number, y: number) {
    super();
    const opacity = 1 - Math.random() * 1;
    const size = Math.random() * 1.5 + 0.5;

    this.circle(x, y, size).fill("white");

    this.alpha = opacity;
    this.pivot.set(0.5);
  }
}

export class Sky extends Container {
  private background: Graphics;

  private starsCount = 80;

  private stars: Star[] = [];

  constructor(width: number, height: number) {
    super();

    this.background = new Graphics()
      .rect(0, 0, width, height)
      .fill("#1d3164ff")
      .stroke({ width: 0 });

    this.addChild(this.background);

    for (let i = 0; i < this.starsCount; i++) {
      const star = new Star(Math.random() * width, Math.random() * height);
      this.stars.push(star);
      this.addChild(star);
    }
  }

  update(ticker: Ticker) {
    for (const star of this.stars) {
      star.rotation += Math.sin(ticker.elapsedMS * 0.00003) * 0.08;
    }
  }
}
