import { Injectable } from '@nestjs/common';

import { PrismaService } from '../services/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class BankAccountsRepository {
	constructor(private readonly prismaService: PrismaService) {}

	create(args: Prisma.BankAccountCreateArgs) {
		return this.prismaService.bankAccount.create(args);
	}

	findMany(args: Prisma.BankAccountFindManyArgs) {
		return this.prismaService.bankAccount.findMany(args);
	}

	findFirst(args: Prisma.BankAccountFindFirstArgs) {
		return this.prismaService.bankAccount.findFirst(args);
	}

	update(args: Prisma.BankAccountUpdateArgs) {
		return this.prismaService.bankAccount.update(args);
	}

	async delete(args: Prisma.BankAccountDeleteArgs) {
		await this.prismaService.bankAccount.delete(args);
	}
}
