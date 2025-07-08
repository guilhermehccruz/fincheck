import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/active-user-id';

@Controller('transactions')
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	@Post()
	create(@ActiveUserId() userId: string, @Body() dto: CreateTransactionDto) {
		return this.transactionsService.create(userId, dto);
	}

	@Get()
	findAll(@ActiveUserId() userId: string) {
		return this.transactionsService.findAllByUserId(userId);
	}

	@Put(':transactionId')
	update(
		@ActiveUserId() userId: string,
		@Param('transactionId', new ParseUUIDPipe()) transactionId: string,
		@Body() updateTransactionDto: UpdateTransactionDto,
	) {
		return this.transactionsService.update(userId, transactionId, updateTransactionDto);
	}

	@Delete(':transactionId')
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@ActiveUserId() userId: string, @Param('transactionId', new ParseUUIDPipe()) transactionId: string) {
		return this.transactionsService.remove(userId, transactionId);
	}
}
