import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninDto {
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string;
}
