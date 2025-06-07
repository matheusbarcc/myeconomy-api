import { ExpensesRepository } from "@/repositories/expenses-repository";
import { date } from "zod";

interface FetchUserExpensesServiceRequest {
  userId: string;
  date?: Date;
}

export class FetchUserExpensesService {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({ userId, date }: FetchUserExpensesServiceRequest) {
    const expenses = await this.expensesRepository.findManyByUserIdAndDate(
      userId,
      date
    );

    return {
      expenses,
    };
  }
}
