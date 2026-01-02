import { Application } from "pixi.js";
import "@pixi/layout";
import { Game, WORLD_HEIGHT, WORLD_WIDTH } from "./core/Game";
import { ParkScene } from "./scenes/ParkScene";
import { AudioManager } from "./core/AudioManager";
import { preloadAssets } from "./loaders/assetLoader";
import { Viewport } from "pixi-viewport";

(async () => {
  await preloadAssets();

  const app = new Application();

  await app.init({ background: "#1e2a4dff", resizeTo: window });

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const audio = new AudioManager();

  const viewport = new Viewport({
    screenHeight: window.innerHeight,
    screenWidth: window.innerWidth,
    worldWidth: WORLD_WIDTH,
    worldHeight: window.innerHeight,
    events: app.renderer.events,
  });

  viewport.clamp({
    direction: "x",
  });

  const game = new Game(app, audio, viewport);

  app.stage.addChild(viewport);

  game.start(ParkScene);

  document.addEventListener("beforeunload", () => {
    game.destroy();
  });
})();
