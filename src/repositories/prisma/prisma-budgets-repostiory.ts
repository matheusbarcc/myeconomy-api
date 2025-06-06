import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma";
import { BudgetsRepository } from "../budgets-repository";

export class PrismaBudgetsRepository implements BudgetsRepository {
  async findMany() {
    const budgets = await prisma.budget.findMany();

    return budgets;
  }

  async findByDate(date: Date) {
    const budget = await prisma.budget.findFirst({
      where: {
        date,
      },
    });

    return budget;
  }

  async findById(id: string) {
    const budget = await prisma.budget.findUnique({
      where: {
        id,
      },
    });

    return budget;
  }

  async update(data: Prisma.BudgetUncheckedUpdateInput) {
    const budget = await prisma.budget.update({
      where: {
        id: data.id as string,
      },
      data: {
        amount_in_cents: data.amount_in_cents,
        date: data.date,
      },
    });

    return budget;
  }

  async create(data: Prisma.BudgetUncheckedCreateInput) {
    const budget = await prisma.budget.create({
      data,
    });

    return budget;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.budget.delete({
      where: {
        id,
      },
    });
  }
}
