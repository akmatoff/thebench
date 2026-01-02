import { Player } from "./player";

export type Bench = {
  id: string;
  witnessCount: number;
  sitters: [Player | null, Player | null] | null;
  isTaken: boolean;
  lastGesture: Gesture | null;
  seatPositions: [{ x: number }, { x: number }];
  seatRadius: number;
  position: { x: number };
};

export type LightingPhase = "day" | "night" | "dawn" | "dusk";
export type Atmosphere = {
  lighting: LightingPhase;
  timeOfDay: string;
};

export type Gesture = {
  type: string;
  authorId: string;
  performedAt: string;
};
