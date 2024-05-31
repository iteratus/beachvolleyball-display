export type TeamType = {
  id: string;
  name: string;
  color: string;
  score: number;
  eliminated: boolean;
};

export type DragDataType = { id: string };

export interface TimerHandling {
  reset: () => void;
}
