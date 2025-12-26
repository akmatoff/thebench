export type Bench = {
  id: string;
  witnessCount: number;
  sitters: [Participant | null, Participant | null] | null;
  isTaken: boolean;
  lastGesture: Gesture | null;
};

export type Participant = {
  id: string;
  role: ParticipantRole;
  joinedAt: string;
};

export type ParticipantRole = "sitter" | "witness";

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

export type GameMessage = {
  type: "PING" | "ACTION";
  payload?: any;
};

export type Player = {
  id: string;
  role: PlayerRole;
  state: PlayerState;
};

export type PlayerState = "idle" | "smoking";
export type PlayerRole = "sitter" | "witness";

export type GameState = {
  players: Map<string, Player>;
  bench: Bench;
};
