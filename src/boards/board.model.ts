import { BoardStatus } from './boardStatus.model';

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}
