import { IsDateString, IsEnum, IsNotEmpty, IsPositive, IsString, IsUUID } from 'class-validator';
import { TransactionType } from '../entity/transaction.entity';

export class CreateTransactionDto {
	@IsUUID()
	bankAccountId: string;

	@IsUUID()
	categoryId: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsPositive()
	value: number;

	@IsDateString()
	date: string;

	@IsEnum(TransactionType)
	type: TransactionType;
}
