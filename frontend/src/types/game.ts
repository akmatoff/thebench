import { Bench } from "./bench";
import { Player } from "./player";

export type GameState = {
  players: Map<string, Player>;
  bench: Bench;
};

export type Action = "smoke" | "sit" | "leave" | "wave" | "pat";

export enum Intent {
  Smoke = "smoke",
  Sit = "sit",
  Leave = "leave",
  Wave = "wave",
  Pat = "pat",
}
