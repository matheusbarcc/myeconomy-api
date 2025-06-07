import { BudgetsRepository } from "@/repositories/budgets-repository";
import { validateBeforeCurrentDate } from "@/utils/validate-before-current-date";
import { validateDuplicateDate } from "@/utils/validate-duplicate-date";

interface CreateBudgetServiceRequest {
  userId: string;
  amountInCents: number;
  date: Date;
}

export class CreateBudgetService {
  constructor(private budgetRepository: BudgetsRepository) {}

  async execute({ userId, amountInCents, date }: CreateBudgetServiceRequest) {
    validateBeforeCurrentDate(date, "budget");

    await validateDuplicateDate(this.budgetRepository, userId, date);

    await this.budgetRepository.create({
      user_id: userId,
      amount_in_cents: amountInCents,
      date,
    });
  }
}
