import { Injectable } from '@nestjs/common';

import { PrismaService } from '../services/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UsersRepository {
	constructor(private readonly prismaService: PrismaService) {}

	create(args: Prisma.UserCreateArgs) {
		return this.prismaService.user.create(args);
	}

	findUnique(args: Prisma.UserFindUniqueArgs) {
		return this.prismaService.user.findUnique(args);
	}
}
