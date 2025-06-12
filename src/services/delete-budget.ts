import { BudgetsRepository } from "@/repositories/budgets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UserNotAllowedError } from "./errors/user-not-allowed-error";
import { validateBeforeCurrentDate } from "@/utils/validate-before-current-date";

interface DeleteBudgetServiceRequest {
  userId: string;
  budgetId: string;
}

export class DeleteBudgetService {
  constructor(private budgetRepository: BudgetsRepository) {}

  async execute({ userId, budgetId }: DeleteBudgetServiceRequest) {
    const budgetInDB = await this.budgetRepository.findById(budgetId);

    if (!budgetInDB) {
      throw new ResourceNotFoundError();
    }

    if (budgetInDB.user_id !== userId) {
      throw new UserNotAllowedError();
    }

    validateBeforeCurrentDate(budgetInDB.date, "budget");

    await this.budgetRepository.deleteById(budgetId);
  }
}
