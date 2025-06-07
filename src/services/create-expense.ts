import { ExpensesRepository } from "@/repositories/expenses-repository";
import { validateBeforeCurrentDate } from "@/utils/validate-before-current-date";

interface CreateExpenseServiceRequest {
  userId: string;
  description: string;
  amountInCents: number;
  date: Date;
}

export class CreateExpenseService {
  constructor(private expenseRepository: ExpensesRepository) {}

  async execute({
    userId,
    description,
    amountInCents,
    date,
  }: CreateExpenseServiceRequest) {
    validateBeforeCurrentDate(date, "expense");

    await this.expenseRepository.create({
      user_id: userId,
      description,
      amount_in_cents: amountInCents,
      date,
    });
  }
}
