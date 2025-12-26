import { Bench } from "./bench";
import { GameState } from "./game";
import { Player } from "./player";

export type GameOutgoingMessage = {
  type: "PING" | "PONG" | "ACTION";
  payload?: any;
};

export type GameIncomingMessage = GameState | { type: string };

export type GameStateSnapshot = {
  players: Map<string, Player>;
  bench: Bench;
};
