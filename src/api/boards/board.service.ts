import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './dto/create-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}
    getBoardById(id: number): Promise<Board> {
        console.log(id);
        const result = this.boardRepository.findOne(id);
        if (!result) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return result;
    }
    async getAllBoards(): Promise<Board[]> {
        const result = await this.boardRepository.find();
        if (!result) {
            throw new NotFoundException(`Can't find Board all`);
        }
        return result;
    }
    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }
    async deleteBoard(id: number): Promise<string> {
        const result = await this.boardRepository.delete(id);
        if (result.affected == 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return `Delete Board with id ${id}`;
    }
    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
    // getBoardById(id: string): Board {
    //     const result = this.boards.find((board) => board.id === id);
    //     if (!result) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     return result;
    // }
    // deleteBoard(id: string): void {
    //     const result = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== result.id);
    // }
    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
