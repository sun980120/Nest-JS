import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthCheckDto, AuthCredentialsDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private jwtService: JwtService,
    ) {}
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.authRepository.signUp(authCredentialsDto);
    }
    async login(authCheckDto: AuthCheckDto): Promise<{ accessToken: string }> {
        const { email, password } = authCheckDto;
        const auth = await this.authRepository.findOne({ email });
        const isValid = await auth.validatePassword(password);
        if (auth && isValid) {
            // 유저 토큰 생성 ( Secret + Payload )
            const payload = { email };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken: accessToken };
        } else {
            throw new UnauthorizedException('Login Failed');
        }
    }
}
