export type Player = {
  id: string;
  role: PlayerRole;
  state: PlayerState;
};

export type PlayerState = "idle" | "smoking";
export type PlayerRole = "sitter" | "witness";
