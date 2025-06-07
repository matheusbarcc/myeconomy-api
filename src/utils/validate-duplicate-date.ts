import { BudgetsRepository } from "@/repositories/budgets-repository";
import { BudgetDateAlreadyExistsError } from "@/services/errors/budget-date-already-exists-error";

export async function validateDuplicateDate(
  repository: BudgetsRepository,
  userId: string,
  date: Date,
  budgetId?: string
) {
  const budgetInSameMonth = await repository.findByYearAndMonth(
    userId,
    date.getUTCFullYear(),
    date.getUTCMonth()
  );

  if (budgetInSameMonth && budgetInSameMonth.id !== budgetId) {
    throw new BudgetDateAlreadyExistsError();
  }
}
