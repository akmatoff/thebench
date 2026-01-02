import { Assets } from "pixi.js";

import bgLandscape from "../assets/sprites/bg-landscape.png";
import bench from "../assets/sprites/the-bench.png";
import streetLamp from "../assets/sprites/street-lamp.png";
import streetLampBulb from "../assets/sprites/street-lamp-bulb.png";
import player from "../assets/sprites/player-spritesheet.png";

export const preloadAssets = async () => {
  Assets.init();

  Assets.add({
    alias: "background",
    src: bgLandscape,
  });

  Assets.add({
    alias: "bench",
    src: bench,
  });

  Assets.add({
    alias: "streetLamp",
    src: streetLamp,
  });

  Assets.add({
    alias: "streetLampBulb",
    src: streetLampBulb,
  });

  Assets.add({
    alias: "player",
    src: player,
  });

  await Assets.load([
    "player",
    "background",
    "bench",
    "streetLamp",
    "streetLampBulb",
  ]);
};
