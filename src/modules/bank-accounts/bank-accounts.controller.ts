import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/active-user-id';

@Controller('bank-accounts')
export class BankAccountsController {
	constructor(private readonly bankAccountsService: BankAccountsService) {}

	@Post()
	create(@ActiveUserId() userId: string, @Body() dto: CreateBankAccountDto) {
		return this.bankAccountsService.create(userId, dto);
	}

	@Get()
	findAll(@ActiveUserId() userId: string) {
		return this.bankAccountsService.findAllByUserId(userId);
	}

	@Put(':bankAccountId')
	update(
		@ActiveUserId() userId: string,
		@Param('bankAccountId', new ParseUUIDPipe()) bankAccountId: string,
		@Body() dto: UpdateBankAccountDto,
	) {
		return this.bankAccountsService.update(userId, bankAccountId, dto);
	}

	@Delete(':bankAccountId')
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@ActiveUserId() userId: string, @Param('bankAccountId', new ParseUUIDPipe()) bankAccountId: string) {
		return this.bankAccountsService.remove(userId, bankAccountId);
	}
}
