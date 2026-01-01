export type Player = {
  id: string;
  role: PlayerRole;
  state: PlayerState;
  position: PlayerPosition;
  facing: PlayerFacing;
  isMoving: boolean;
};

export type PlayerFacing = "left" | "right";

export type PlayerState = "idle" | "smoking" | "walking";
export type PlayerRole = "sitter" | "witness";
export type PlayerPosition = {
  x: number;
};

export type MovementDirection = "left" | "right";
