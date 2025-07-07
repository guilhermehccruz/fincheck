import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@IsPublic()
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signin')
	signin(@Body() dto: SigninDto) {
		return this.authService.signin(dto);
	}

	@Post('signup')
	signup(@Body() createUserDto: SignupDto) {
		return this.authService.signup(createUserDto);
	}
}
