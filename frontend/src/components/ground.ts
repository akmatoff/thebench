import { Graphics } from "pixi.js";

export class Ground extends Graphics {
  constructor(width: number, height: number = 252) {
    super();

    this.rect(0, 0, width, height).fill("#27345eff");

    this.y = height;
    this.pivot.y = height;
  }
}
