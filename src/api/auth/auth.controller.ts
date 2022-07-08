import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<string> {
        return this.authService.signUp(authCredentialsDto);
    }
}
