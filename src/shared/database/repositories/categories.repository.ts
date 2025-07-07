import { Injectable } from '@nestjs/common';

import { PrismaService } from '../services/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class CategoriesRepository {
	constructor(private readonly prismaService: PrismaService) {}

	findMany(args: Prisma.CategoryFindManyArgs) {
		return this.prismaService.category.findMany(args);
	}
}
