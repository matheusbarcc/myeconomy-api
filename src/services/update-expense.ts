import { ExpensesRepository } from "@/repositories/expenses-repository";
import { validateBeforeCurrentDate } from "@/utils/validate-before-current-date";
import { validateDuplicateDate } from "@/utils/validate-duplicate-date";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UserNotAllowedError } from "./errors/user-not-allowed-error";

interface UpdateExpenseServiceRequest {
  userId: string;
  expenseId: string;
  description: string;
  amountInCents: number;
  date: Date;
}

export class UpdateExpenseService {
  constructor(private expenseRepository: ExpensesRepository) {}

  async execute({
    userId,
    expenseId,
    description,
    amountInCents,
    date,
  }: UpdateExpenseServiceRequest) {
    const expenseInDB = await this.expenseRepository.findById(expenseId);

    if (!expenseInDB) {
      throw new ResourceNotFoundError();
    }

    if (expenseInDB.user_id !== userId) {
      throw new UserNotAllowedError();
    }

    validateBeforeCurrentDate(date, "expense");

    validateBeforeCurrentDate(expenseInDB.date, "expense");

    await this.expenseRepository.update({
      id: expenseId,
      user_id: userId,
      description,
      amount_in_cents: amountInCents,
      date,
    });
  }
}
