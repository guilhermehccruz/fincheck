import { Global, Module } from '@nestjs/common';

import { PrismaService } from './services/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { CategoriesRepository } from './repositories/categories.repository';
import { BankAccountsRepository } from './repositories/bank-accounts.repository';

@Global()
@Module({
	providers: [
		// Services
		PrismaService,

		// Repositories
		UsersRepository,
		CategoriesRepository,
		BankAccountsRepository,
	],
	exports: [
		// Repositories
		UsersRepository,
		CategoriesRepository,
		BankAccountsRepository,
	],
})
export class DatabaseModule {}
