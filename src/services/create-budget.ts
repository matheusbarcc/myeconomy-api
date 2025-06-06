import { BudgetsRepository } from "@/repositories/budgets-repository";
import { BudgetDateAlreadyExistsError } from "./errors/budget-date-already-exists-error";
import dayjs from "dayjs";
import { BudgetBeforeCurrentDateError } from "./errors/budget-before-current-date-error";

interface CreateBudgetServiceRequest {
  userId: string;
  amountInCents: number;
  date: Date;
}

export class CreateBudgetService {
  constructor(private budgetRepository: BudgetsRepository) {}

  async execute({ userId, amountInCents, date }: CreateBudgetServiceRequest) {
    const budgetInSameMonth = await this.budgetRepository.findByYearAndMonth(
      userId,
      date.getUTCFullYear(),
      date.getUTCMonth()
    );

    if (dayjs(date).isBefore(new Date())) {
      throw new BudgetBeforeCurrentDateError();
    }
    if (budgetInSameMonth) {
      throw new BudgetDateAlreadyExistsError();
    }

    await this.budgetRepository.create({
      user_id: userId,
      amount_in_cents: amountInCents,
      date,
    });
  }
}
