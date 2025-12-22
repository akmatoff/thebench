import { Container, Graphics, Ticker } from "pixi.js";
import { MotionBlurFilter } from "pixi-filters";

export class Rain extends Container {
  rainDrops: Graphics[] = [];

  rainDropCount: number = 500;

  constructor(width: number, height: number) {
    super();

    this.width = width;
    this.height = height;

    this.zIndex = 9000;

    for (let i = 0; i < this.rainDropCount; i++) {
      const rainDrop = new Graphics();

      const x = Math.random() * width;
      const y = Math.random() * height;

      rainDrop.moveTo(0, 0).lineTo(0, 15).stroke("white");

      rainDrop.x = x;
      rainDrop.y = y;

      rainDrop.alpha = 0.15 + Math.random() * 0.1;

      this.rainDrops.push(rainDrop);
      this.addChild(rainDrop);
    }

    const blurFilter = new MotionBlurFilter({
      kernelSize: 10,
      velocity: {
        y: 70,
        x: 4,
      },
    });

    this.filters = [blurFilter];
  }

  update(ticker: Ticker) {
    const speed = 25 * ticker.deltaTime;

    for (const rainDrop of this.rainDrops) {
      rainDrop.y += speed;
      rainDrop.x += 5 * ticker.deltaTime;

      if (rainDrop.y > this.height) {
        rainDrop.x = Math.random() * this.width;
        rainDrop.y = Math.random() * this.height - 5;
      }
    }
  }
}
