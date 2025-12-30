import { Bench } from "./bench";
import { Player } from "./player";

export type GameState = {
  players: Map<string, Player>;
  bench: Bench;
};

export type Action =
  | "smoke"
  | "stop_smoking"
  | "sit"
  | "leave"
  | "wave"
  | "pat"
  | "move_left"
  | "move_right";

export enum Intent {
  Smoke = "smoke",
  Sit = "sit",
  Leave = "leave",
  Wave = "wave",
  Pat = "pat",
  MoveLeft = "move_left",
  MoveRight = "move_right",
}
