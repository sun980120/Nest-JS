import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardStatus } from './dto/create-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/booard-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-auth.decorator';
import { Auth } from '../auth/auth.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardController {
    private logger = new Logger('BoardsController');
    constructor(private boardsService: BoardService) {}
    @Get()
    getAllBoard(): Promise<Board[]> {
        this.logger.verbose(`Trying to get my all boards`);
        return this.boardsService.getAllBoards();
    }
    @Get('/my')
    getMyBoard(@GetUser() auth: Auth): Promise<Board[]> {
        this.logger.verbose(
            `User ${auth.username} trying to get my all boards`,
        );
        return this.boardsService.getMyBoard(auth);
    }
    @Get('/:id')
    getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() auth: Auth,
    ): Promise<Board> {
        this.logger.verbose(
            `User ${auth.username} creating a new board.
            Payload: {title : ${createBoardDto.title}, description : ${createBoardDto.description}}`,
        );
        return this.boardsService.createBoard(createBoardDto, auth);
    }
    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() auth: Auth,
    ): Promise<string> {
        this.logger.verbose(
            `User ${auth.username} deleting a board.
            Id : ${id}`,
        );
        return this.boardsService.deleteBoard(id, auth);
    }
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
        @GetUser() auth: Auth,
    ): Promise<Board> {
        this.logger.verbose(
            `User ${auth.username} updating a board.
            Id : ${id}`,
        );
        return this.boardsService.updateBoardStatus(id, status, auth);
    }
}
