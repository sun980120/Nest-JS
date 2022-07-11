import { Board } from './board.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './dto/create-board.dto';
import { Auth } from '../auth/auth.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
    async createBoard(
        createBoardDto: CreateBoardDto,
        auth: Auth,
    ): Promise<Board> {
        const { title, description } = createBoardDto;
        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            auth: auth,
        });
        await this.save(board);
        return board;
    }
}
