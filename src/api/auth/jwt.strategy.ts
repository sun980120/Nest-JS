import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { Auth } from './auth.entity';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload) {
        const { email } = payload;
        const auth: Auth = await this.authRepository.findOne({ email });
        if (!auth) throw new UnauthorizedException();
        return auth;
    }
}
