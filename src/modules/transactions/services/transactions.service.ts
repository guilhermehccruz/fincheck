import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-service-ownership.service';
import { ListTransactionsFiltersDTO } from '../dto/list-transactions-filters.dto';

@Injectable()
export class TransactionsService {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
		private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
		private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
	) {}

	async create(userId: string, dto: CreateTransactionDto) {
		await this.validateOwnerships({ userId, bankAccountId: dto.bankAccountId, categoryId: dto.categoryId });

		return this.transactionsRepository.create({ data: { ...dto, userId } });
	}

	findAllByUserId(userId: string, { year, month, bankAccountId, type }: ListTransactionsFiltersDTO) {
		return this.transactionsRepository.findMany({
			where: {
				userId,
				bankAccountId,
				type,
				date: {
					gte: new Date(Date.UTC(year, month)),
					lt: new Date(Date.UTC(year, month + 1)),
				},
			},
		});
	}

	async update(userId: string, transactionId: string, dto: UpdateTransactionDto) {
		await this.validateOwnerships({
			userId,
			bankAccountId: dto.bankAccountId,
			categoryId: dto.categoryId,
			transactionId,
		});

		return this.transactionsRepository.update({ where: { id: transactionId }, data: { ...dto, userId } });
	}

	async remove(userId: string, transactionId: string) {
		await this.validateOwnerships({ userId, transactionId });

		await this.transactionsRepository.delete({ where: { id: transactionId } });
	}

	private async validateOwnerships({ userId, bankAccountId, categoryId, transactionId }: ValidateOwnershipsParams) {
		await Promise.all([
			transactionId && this.validateTransactionOwnershipService.validate(userId, transactionId),
			bankAccountId && this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
			categoryId && this.validateCategoryOwnershipService.validate(userId, categoryId),
		]);
	}
}

interface ValidateOwnershipsParams {
	userId: string;
	transactionId?: string;
	bankAccountId?: string;
	categoryId?: string;
}
