import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
	constructor(
		private readonly bankAccountsRepository: BankAccountsRepository,
		private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
	) {}

	create(userId: string, dto: CreateBankAccountDto) {
		return this.bankAccountsRepository.create({ data: { ...dto, userId } });
	}

	async findAllByUserId(userId: string) {
		const bankAccounts = await this.bankAccountsRepository.findMany({
			where: { userId },
			include: { transactions: { select: { type: true, value: true } } },
		});

		return bankAccounts.map(({ transactions, ...bankAccount }) => {
			const currentBalance = transactions.reduce(
				(acc, transaction) =>
					transaction.type === 'INCOME' ? acc + transaction.value : acc - transaction.value,
				bankAccount.initialBalance,
			);

			return { ...bankAccount, currentBalance };
		});
	}

	async update(userId: string, bankAccountId: string, dto: UpdateBankAccountDto) {
		await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

		return this.bankAccountsRepository.update({ where: { id: bankAccountId }, data: dto });
	}

	async remove(userId: string, bankAccountId: string) {
		await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

		await this.bankAccountsRepository.delete({ where: { id: bankAccountId } });
	}
}
