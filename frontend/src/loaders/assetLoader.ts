import { Assets } from "pixi.js";

export const preloadAssets = async () => {
  Assets.init();

  Assets.add({
    alias: "background",
    src: "src/assets/sprites/bg-landscape.png",
  });

  Assets.add({
    alias: "bench",
    src: "src/assets/sprites/the-bench.png",
  });

  Assets.add({
    alias: "streetLamp",
    src: "src/assets/sprites/street-lamp.png",
  });

  Assets.add({
    alias: "streetLampBulb",
    src: "src/assets/sprites/street-lamp-bulb.png",
  });

  Assets.add({
    alias: "player",
    src: "src/assets/sprites/player-spritesheet.png",
  });

  await Assets.load([
    "player",
    "background",
    "bench",
    "streetLamp",
    "streetLampBulb",
  ]);
};
