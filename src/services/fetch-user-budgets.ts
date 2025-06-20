import { BudgetsRepository } from "@/repositories/budgets-repository";

interface FetchUserBudgetsServiceRequest {
  userId: string;
}

export class FetchUserBudgetsService {
  constructor(private budgetsRepository: BudgetsRepository) {}

  async execute({ userId }: FetchUserBudgetsServiceRequest) {
    const budgets = await this.budgetsRepository.findManyByUserId(userId);

    return {
      budgets,
    };
  }
}
