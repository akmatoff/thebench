export type Player = {
  id: string;
  role: PlayerRole;
  state: PlayerState;
  position: PlayerPosition;
};

export type PlayerState = "idle" | "smoking";
export type PlayerRole = "sitter" | "witness";
export type PlayerPosition = {
  x: number;
};

export type MovementDirection = "left" | "right";
