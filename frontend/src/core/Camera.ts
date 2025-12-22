import { Container } from "pixi.js";

export class Camera {
  public container = new Container();

  constructor(
    private appWidth: number,
    private appHeight: number
  ) {}

  follow(target: Container) {
    this.container.x = target.x - this.appWidth / 2;
    this.container.y = target.y - this.appHeight / 2;
  }

  clamp(minX: number, minY: number, maxX: number, maxY: number) {
    const hw = this.appWidth / 2;
    const hh = this.appHeight / 2;

    this.container.x = Math.max(
      -maxX + hw,
      Math.min(-minX + hw, this.container.x)
    );
    this.container.y = Math.max(
      -maxY + hh,
      Math.min(-minY + hh, this.container.y)
    );
  }
}
