import { Injectable } from '@nestjs/common';
import { Board } from './board.model';
import { BoardStatus } from './boardStatus.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // todo: 실제 DB 연결 후 수정

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const board: Board = {
      id: uuid(),
      ...createBoardDto,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }
}
