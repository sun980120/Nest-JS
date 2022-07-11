import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(2, { message: `Name is too short` })
    @MaxLength(30, { message: `Name is too long` })
    username: string;
    @IsString()
    @IsEmail()
    @MaxLength(60, { message: `Email is too long` })
    email: string;
    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,20}$/, { message: `비밀번호 유효성 검사 실패!!` })
    password: string;
}
export class AuthCheckDto {
    @IsString()
    @IsEmail()
    @MaxLength(60, { message: `Email is too long` })
    email: string;
    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,20}$/, { message: `비밀번호 유효성 검사 실패!!` })
    password: string;
}
