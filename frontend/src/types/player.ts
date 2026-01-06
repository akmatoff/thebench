export type Player = {
  id: string;
  role: PlayerRole;
  state: PlayerState;
  position: PlayerPosition;
  facing: PlayerFacing;
};

export type PlayerFacing = "left" | "right";

export type PlayerState =
  | "idle"
  | "standing_smoking"
  | "sitting_smoking"
  | "sitting"
  | "walking"
  | "walking_smoking";

export type PlayerRole = "sitter" | "witness";
export type PlayerPosition = {
  x: number;
};

export type MovementDirection = "left" | "right";
