import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { TransactionType } from '../entity/transaction.entity';

export class ListTransactionsFiltersDTO {
	@IsInt()
	@Min(0)
	@Max(11)
	@Type(() => Number)
	month: number;

	@IsInt()
	@Type(() => Number)
	year: number;

	@IsOptional()
	@IsUUID()
	bankAccountId?: string;

	@IsOptional()
	@IsEnum(TransactionType)
	type?: TransactionType;
}
