export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Room {
  players: Player[];
  round: number;
  gameStarted: boolean;
  isGreen: boolean;
  timer?: NodeJS.Timeout;
}
