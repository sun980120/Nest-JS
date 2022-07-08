import { Module } from '@nestjs/common';
import { BoardModule } from './api/boards/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './api/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forRoot(typeORMConfig), BoardModule, AuthModule],
})
export class AppModule {}
