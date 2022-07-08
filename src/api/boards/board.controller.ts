import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardStatus } from './dto/create-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/booard-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardController {
    constructor(private boardsService: BoardService) {}
    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }
    @Get('/:id')
    getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.boardsService.deleteBoard(id);
    }
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
