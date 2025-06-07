import { ExpensesRepository } from "@/repositories/expenses-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UserNotAllowedError } from "./errors/user-not-allowed-error";
import { validateBeforeCurrentDate } from "@/utils/validate-before-current-date";

interface DeleteExpenseServiceRequest {
  userId: string;
  expenseId: string;
}

export class DeleteExpenseService {
  constructor(private expenseRepository: ExpensesRepository) {}

  async execute({ userId, expenseId }: DeleteExpenseServiceRequest) {
    const expenseInDB = await this.expenseRepository.findById(expenseId);

    if (!expenseInDB) {
      throw new ResourceNotFoundError();
    }

    if (expenseInDB.user_id !== userId) {
      throw new UserNotAllowedError();
    }

    validateBeforeCurrentDate(expenseInDB.date, "expense");

    await this.expenseRepository.deleteById(expenseId);
  }
}
