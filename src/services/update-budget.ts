import { BudgetsRepository } from "@/repositories/budgets-repository";
import { BudgetDateAlreadyExistsError } from "./errors/budget-date-already-exists-error";
import dayjs from "dayjs";
import { BudgetBeforeCurrentDateError } from "./errors/budget-before-current-date-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UserNotAllowedError } from "./errors/user-not-allowed-error";
import { validateBeforeCurrentDate } from "@/utils/validate-before-current-date";
import { validateDuplicateDate } from "@/utils/validate-duplicate-date";

interface UpdateBudgetServiceRequest {
  userId: string;
  budgetId: string;
  amountInCents: number;
  date: Date;
}

export class UpdateBudgetService {
  constructor(private budgetRepository: BudgetsRepository) {}

  async execute({
    userId,
    budgetId,
    amountInCents,
    date,
  }: UpdateBudgetServiceRequest) {
    const budgetInDB = await this.budgetRepository.findById(budgetId);

    if (!budgetInDB) {
      throw new ResourceNotFoundError();
    }

    if (budgetInDB.user_id !== userId) {
      throw new UserNotAllowedError();
    }

    validateBeforeCurrentDate(date);

    validateBeforeCurrentDate(budgetInDB.date);

    await validateDuplicateDate(this.budgetRepository, userId, date, budgetId);

    await this.budgetRepository.update({
      id: budgetId,
      user_id: userId,
      amount_in_cents: amountInCents,
      date,
    });
  }
}
