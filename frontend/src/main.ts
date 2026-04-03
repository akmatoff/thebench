import { Application, Assets } from "pixi.js";
import "@pixi/layout";
import { Game, WORLD_HEIGHT, WORLD_WIDTH } from "./core/Game";
import { ParkScene } from "./scenes/ParkScene";
import { AudioManager } from "./core/AudioManager";
import { preloadAssets } from "./loaders/assetLoader";
import { Viewport } from "pixi-viewport";
import { initLoaderUI, initUI, updateLoaderUI } from "./ui";

initLoaderUI();

(async () => {
  const onProgress = (progress: number) => {
    updateLoaderUI(progress);
  };

  Assets.loader.loadOptions.onProgress = onProgress;

  try {
    await preloadAssets();
  } catch (e) {
    console.error("Failed to load assets", e);
  }

  const app = new Application();

  await app.init({
    background: "#000000",
    resizeTo: window,
  });

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const audio = new AudioManager();

  const viewport = new Viewport({
    screenHeight: window.innerHeight,
    screenWidth: window.innerWidth,
    worldWidth: WORLD_WIDTH,
    worldHeight: WORLD_HEIGHT,
    events: app.renderer.events,
  });

  viewport.clamp({
    left: 0,
    right: WORLD_WIDTH,
    top: WORLD_HEIGHT / 2,
    bottom: WORLD_HEIGHT,
  });

  const game = new Game(app, audio, viewport);

  app.stage.addChild(viewport);

  game.start(ParkScene);

  initUI();

  document.addEventListener("beforeunload", () => {
    game.destroy();
  });
})();
