import { EntityRepository, Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';

import * as pbkdf2Password from 'pbkdf2-password';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { email, username, password } = authCredentialsDto;
        // const salt = await pbkdf2Password.genSalt();
        // const hashedPassword = await pbkdf2Password.hash(password, salt);
        const user = this.create({ email, username, hashedPassword });
        try {
            await this.save(user);
            return 'Create Auth';
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException('Existing email or username ');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
