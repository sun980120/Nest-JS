import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([BoardRepository]), AuthModule],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule {}
