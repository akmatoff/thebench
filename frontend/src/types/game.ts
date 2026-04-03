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
  | "move_left_start"
  | "move_right_start"
  | "move_left_stop"
  | "move_right_stop"
  | "take_drag";

export enum Intent {
  Smoke = "smoke",
  Sit = "sit",
  Leave = "leave",
  Wave = "wave",
  Pat = "pat",
  MoveLeft = "move_left",
  MoveRight = "move_right",
  TakeDrag = "take_drag",
}
