import { Assets } from "pixi.js";

export const loadAssets = async () => {
  await Assets.load({
    alias: "bench",
    src: "/assets/the-bench.png",
  });
};

export const getTexture = (alias: string) => Assets.get(alias);
