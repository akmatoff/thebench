import { Container, Ticker } from "pixi.js";
import { LightSource } from "./LightSource";

export class LightSystem {
  private lightLayer: Container;
  private lights: LightSource[] = [];

  constructor(parentContainer: Container) {
    this.lightLayer = new Container();
    this.lightLayer.blendMode = "normal";
    this.lightLayer.zIndex = 1000;
    parentContainer.addChild(this.lightLayer);
  }

  addLight(light: LightSource) {
    this.lights.push(light);
    this.lightLayer.addChild(light);
  }

  removeLight(light: LightSource): void {
    const index = this.lights.indexOf(light);
    if (index > 1) {
      this.lights.splice(index, 1);
      this.lightLayer.removeChild(light);
    }
  }

  update(delta: number): void {
    for (const light of this.lights) {
      light.update(delta);
    }
  }

  clear(): void {
    for (const light of this.lights) {
      this.lightLayer.removeChild(light);
    }
    this.lights = [];
  }

  getAllLights(): LightSource[] {
    return this.lights;
  }
}
