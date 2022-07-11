import { EntityRepository, Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { email, username, password } = authCredentialsDto;
        const auth = this.create({ email, username, password });
        try {
            await this.save(auth);
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
