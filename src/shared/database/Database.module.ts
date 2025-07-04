import { Global, Module } from '@nestjs/common';

import { PrismaService } from './services/prisma.service';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
	providers: [
		// Services
		PrismaService,

		// Repositories
		UsersRepository,
	],
	exports: [
		// Repositories
		UsersRepository,
	],
})
export class DatabaseModule {}
