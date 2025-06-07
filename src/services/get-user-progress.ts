import { BudgetsRepository } from "@/repositories/budgets-repository";
import { ExpensesRepository } from "@/repositories/expenses-repository";
import { getProgressStatus } from "@/utils/get-progress-status";
import dayjs from "dayjs";

interface GetProgressServiceRequest {
  userId: string;
  date?: Date;
}

export class GetProgressService {
  constructor(
    private budgetsRepository: BudgetsRepository,
    private expensesRepository: ExpensesRepository
  ) {}

  async execute({ userId, date }: GetProgressServiceRequest) {
    const dateToFetch = date ? date : new Date();

    const budget = await this.budgetsRepository.findByUserIdAndDate(
      userId,
      dateToFetch
    );

    if (!budget) {
      return {
        progress: null,
      };
    }

    const expenses = await this.expensesRepository.findManyByUserIdAndDate(
      userId,
      dateToFetch
    );

    let spentAmountInMonth = 0;
    expenses.map((expense) => (spentAmountInMonth += expense.amount_in_cents));

    const status = getProgressStatus(dateToFetch);

    return {
      progress: {
        // adicionei um dia pq dayjs coloca no mes anterior caso dateToFetch for dia 01
        date: dayjs(dateToFetch).add(1, "day").format("YYYY-MM"),
        spentInCents: spentAmountInMonth,
        budgetInCents: budget.amount_in_cents,
        status,
      },
    };
  }
}
