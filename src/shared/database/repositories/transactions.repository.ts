import { Injectable } from '@nestjs/common';

import { PrismaService } from '../services/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class TransactionsRepository {
	constructor(private readonly prismaService: PrismaService) {}

	create(args: Prisma.TransactionCreateArgs) {
		return this.prismaService.transaction.create(args);
	}

	findMany(args: Prisma.TransactionFindManyArgs) {
		return this.prismaService.transaction.findMany(args);
	}

	findFirst(args: Prisma.TransactionFindFirstArgs) {
		return this.prismaService.transaction.findFirst(args);
	}

	update(args: Prisma.TransactionUpdateArgs) {
		return this.prismaService.transaction.update(args);
	}

	async delete(args: Prisma.TransactionDeleteArgs) {
		await this.prismaService.transaction.delete(args);
	}
}
