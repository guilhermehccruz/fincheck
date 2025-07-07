import { Global, Module } from '@nestjs/common';

import { PrismaService } from './services/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { CategoriesRepository } from './repositories/categories.repository';

@Global()
@Module({
	providers: [
		// Services
		PrismaService,

		// Repositories
		UsersRepository,
		CategoriesRepository,
	],
	exports: [
		// Repositories
		UsersRepository,
		CategoriesRepository,
	],
})
export class DatabaseModule {}
