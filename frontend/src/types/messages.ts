import { Bench } from "./bench";
import { Action, GameState } from "./game";
import { Player } from "./player";

export type MessageType = "PING" | "PONG" | "ACTION" | "CONNECTED" | "STATE";

export type ConnectedPayload = {
  playerId: string;
};

export type ActionPayload = {
  action: Action;
};

export type GameStateSnapshot = {
  players: Map<string, Player>;
  bench: Bench;
};

export type GameOutgoingMessage =
  | { type: "PING" }
  | { type: "ACTION"; payload: ActionPayload };

export type GameIncomingMessage =
  | { type: "PONG"; payload?: null }
  | { type: "CONNECTED"; payload: ConnectedPayload }
  | { type: "STATE"; payload: GameStateSnapshot };
