import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boardStatus.model';

describe('BoardsService', () => {
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllBoards()', () => {
    it('should return an array', () => {
      const result = service.getAllBoards();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getBoardById()', () => {
    it('should return a board', () => {
      const testBoard = service.createBoard({
        title: 'TEST',
        description: 'TEST',
      });
      const board = service.getBoardById(testBoard.id);
      expect(board).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getBoardById('testString');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Board with ID testString not found');
      }
    });
  });

  describe('deleteBoard()', () => {
    it('delete a board', () => {
      const board = service.createBoard({
        title: 'TEST',
        description: 'TEST',
      });
      const beforeDelete = service.getAllBoards().length;
      service.deleteBoard(board.id);
      const afterDelete = service.getAllBoards().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
  });

  describe('createBoard()', () => {
    it('should create a board', () => {
      const beforeCreate = service.getAllBoards().length;
      service.createBoard({
        title: 'TEST',
        description: 'TEST',
      });
      const afterCreate = service.getAllBoards().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('updateBoardStatus()', () => {
    it('should update a boardStatus', () => {
      const board = service.createBoard({
        title: 'TEST',
        description: 'TEST',
      });

      service.updateBoardStatus(board.id, BoardStatus.PRIVATE);

      const updateBoard = service.getBoardById(board.id);
      expect(updateBoard.status).toEqual('PRIVATE');
    });
  });
});
