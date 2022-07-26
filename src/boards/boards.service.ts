import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // todo: 실제 DB 연결 후 수정

  getAllBoards(): Board[] {
    return this.boards;
  }
}
