import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './dto/create-board.dto';
import { Auth } from '../auth/auth.entity';

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: BoardStatus;
    @ManyToOne(type=>Auth, auth=>auth.boards, {eager: false})
    auth: Auth;
}
