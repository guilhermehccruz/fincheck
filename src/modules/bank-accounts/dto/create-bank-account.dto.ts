import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BankAccountType } from '../entities/bank-account';

export class CreateBankAccountDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNumber()
	initialBalance: number;

	@IsHexColor()
	color: string;

	@IsEnum(BankAccountType)
	type: BankAccountType;
}
