import { Texture, Rectangle } from "pixi.js";

function sliceSpritesheet(
  texture: Texture,
  frameWidth: number,
  frameHeight: number
) {
  const frames = [];

  const columns = Math.floor(texture.width / frameWidth);
  const rows = Math.floor(texture.height / frameHeight);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      frames.push(
        new Texture({ ...texture, frame: new Rectangle(x, y, 1, 1) })
      );
    }
  }

  return frames;
}

export { sliceSpritesheet };
