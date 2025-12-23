export type Bench = {
  id: string;
  witnessCount: number;
  sitters: [Participant | null, Participant | null];
  isTaken: boolean;
  atmosphere: Atmosphere;
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

export type BenchMessage = {
  type: string;
  payload?: any;
};
