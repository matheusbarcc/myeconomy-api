import { BudgetsRepository } from "@/repositories/budgets-repository";
import { date } from "zod";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UserNotAllowedError } from "./errors/user-not-allowed-error";

interface GetBudgetByIdServiceRequest {
  budgetId: string;
  userId: string;
}

export class GetBudgetByIdService {
  constructor(private budgetsRepository: BudgetsRepository) {}

  async execute({ budgetId, userId }: GetBudgetByIdServiceRequest) {
    const budget = await this.budgetsRepository.findById(budgetId);

    if (!budget) {
      throw new ResourceNotFoundError();
    }

    if (budget.user_id !== userId) {
      throw new UserNotAllowedError();
    }

    return {
      budget,
    };
  }
}
