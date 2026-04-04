import { Assets } from "pixi.js";

import bench from "../assets/sprites/the-bench.png";
import streetLamp from "../assets/sprites/street-lamp.png";
import streetLampBulb from "../assets/sprites/street-lamp-bulb.png";
import player from "../assets/sprites/player-spritesheet.png";
import bg1 from "../assets/sprites/the bench landscape_0001.png";
import bg2 from "../assets/sprites/the bench landscape_0002.png";
import bg3 from "../assets/sprites/the bench landscape_0003.png";
import bg4 from "../assets/sprites/the bench landscape_0004.png";
import bg5 from "../assets/sprites/the bench landscape_0005.png";
import bg6 from "../assets/sprites/the bench landscape_0006.png";
import bg7 from "../assets/sprites/the bench landscape_0007.png";
import bg8 from "../assets/sprites/the bench landscape_0008.png";
import bg9 from "../assets/sprites/the bench landscape_0009.png";
import bg10 from "../assets/sprites/the bench landscape_0010.png";
import bg11 from "../assets/sprites/the bench landscape_0011.png";

export const preloadAssets = async () => {
  Assets.init();

  Assets.add({
    alias: "bg1",
    src: bg1,
  });

  Assets.add({
    alias: "bg2",
    src: bg2,
  });

  Assets.add({
    alias: "bg3",
    src: bg3,
  });

  Assets.add({
    alias: "bg4",
    src: bg4,
  });

  Assets.add({
    alias: "bg5",
    src: bg5,
  });

  Assets.add({
    alias: "bg6",
    src: bg6,
  });

  Assets.add({
    alias: "bg7",
    src: bg7,
  });

  Assets.add({
    alias: "bg8",
    src: bg8,
  });

  Assets.add({
    alias: "bg9",
    src: bg9,
  });

  Assets.add({
    alias: "bg10",
    src: bg10,
  });

  Assets.add({
    alias: "bg11",
    src: bg11,
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
    "bg1",
    "bg2",
    "bg3",
    "bg4",
    "bg5",
    "bg6",
    "bg7",
    "bg8",
    "bg9",
    "bg10",
    "bg11",
    "bench",
    "streetLamp",
    "streetLampBulb",
  ]);
};
