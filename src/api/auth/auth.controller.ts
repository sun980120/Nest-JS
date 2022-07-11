import {
    Body,
    Controller,
    Post,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCheckDto, AuthCredentialsDto } from './dto/create-auth.dto';
import * as dotenv from 'dotenv';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from './auth.entity';
import { GetUser } from './get-auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<string> {
        return this.authService.signUp(authCredentialsDto);
    }
    @Post('/login')
    login(
        @Body(ValidationPipe) authCheckDto: AuthCheckDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.login(authCheckDto);
    }
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() auth: Auth) {
        console.log('auth', auth);
    }
}
