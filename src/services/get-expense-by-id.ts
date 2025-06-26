import { ExpensesRepository } from "@/repositories/expenses-repository";
import { date } from "zod";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UserNotAllowedError } from "./errors/user-not-allowed-error";

interface GetExpenseByIdServiceRequest {
  expenseId: string;
  userId: string;
}

export class GetExpenseByIdService {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({ expenseId, userId }: GetExpenseByIdServiceRequest) {
    const expense = await this.expensesRepository.findById(expenseId);

    if (!expense) {
      throw new ResourceNotFoundError();
    }

    if (expense.user_id !== userId) {
      throw new UserNotAllowedError();
    }

    return {
      expense,
    };
  }
}
