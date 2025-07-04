import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('me')
	me(@Req() request: Request) {
		// @ts-expect-error	temporary
		return this.usersService.getUserById(request.userId);
	}
}
