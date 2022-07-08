import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
    ) {}
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.authRepository.signUp(authCredentialsDto);
    }
}
