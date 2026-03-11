import { Container, Graphics, Ticker, BLEND_MODES } from "pixi.js";

export interface LightConfig {
  color: number;
  radius: number;
  radiusY?: number;
  intensity?: number;
  flickerSpeed?: number;
  flickerIntensity?: number;
  alpha?: number;
}

export abstract class LightSource extends Container {
  protected graphics: Graphics;
  protected config: LightConfig;

  constructor(config: LightConfig) {
    super();
    this.config = {
      intensity: 0.1,
      flickerSpeed: 0,
      flickerIntensity: 0,
      alpha: 0.2,
      ...config,
    };

    this.graphics = new Graphics();
    this.addChild(this.graphics);

    this.blendMode = "screen";

    this.drawLight();
  }

  protected abstract drawLight(): void;

  protected drawRadialGradient(
    radius: number,
    color: number,
    layers: number = 5
  ): void {
    const radiusY = this.config.radiusY || radius;

    this.graphics.clear();
    for (let i = layers; i > 0; i--) {
      const r = (radius / layers) * i;
      const ry = (radiusY / layers) * i;
      const a = (this.config.alpha! / layers) * i * this.config.intensity!;
      this.graphics.ellipse(0, 0, r, ry);
      this.graphics.fill({ color, alpha: a });
    }
    this.graphics.pivot.set(0.5);
  }

  update(ticker: Ticker): void {
    if (this.config.flickerSpeed! > 0) {
      const flicker =
        Math.sin(ticker.lastTime * this.config.flickerSpeed!) *
        this.config.flickerIntensity!;
      this.alpha = this.config.alpha! + flicker;
    }
  }

  setColor(color: number): void {
    this.config.color = color;
    this.drawLight();
  }

  setRadius(radius: number): void {
    this.config.radius = radius;
    this.drawLight();
  }
}
