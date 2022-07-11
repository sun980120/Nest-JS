import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { Board } from '../boards/board.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email', 'username'])
export class Auth extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @OneToMany(type => Board, board=> board.auth, {eager: true})
    boards: Board[];
    @BeforeInsert()
    async saveEncryptedPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    async validatePassword(password: string): Promise<boolean> {
        const isValid = await bcrypt.compare(password, this.password);
        return isValid;
    }
}
