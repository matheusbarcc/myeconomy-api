import { BudgetsRepository } from "@/repositories/budgets-repository";
import { BudgetDateAlreadyExistsError } from "./errors/budget-date-already-exists-error";

interface CreateBudgetServiceRequest {
  userId: string;
  amountInCents: number;
  date: Date;
}

export class CreateBudgetService {
  constructor(private budgetRepository: BudgetsRepository) {}

  async execute({ userId, amountInCents, date }: CreateBudgetServiceRequest) {
    const budgetWithSameDate = await this.budgetRepository.findByDate(date);

    if (budgetWithSameDate) {
      throw new BudgetDateAlreadyExistsError();
    }

    await this.budgetRepository.create({
      user_id: userId,
      amount_in_cents: amountInCents,
      date,
    });
  }
}
