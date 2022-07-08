import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

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
}
