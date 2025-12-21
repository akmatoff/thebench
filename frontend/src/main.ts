import { Application } from "pixi.js";
import "./websocket";
import { loadAssets } from "./loaders/assetLoader";
import { Game } from "./core/Game";
import { ParkScene } from "./scenes/ParkScene";
import { AudioManager } from "./core/AudioManager";

(async () => {
  await loadAssets();

  const app = new Application();

  await app.init({ background: "#1e2a4dff", resizeTo: window });

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const audio = new AudioManager();

  const game = new Game(app, audio);

  game.start(ParkScene);
})();
