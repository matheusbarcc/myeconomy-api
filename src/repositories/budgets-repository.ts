import { Prisma, Budget } from "generated/prisma";

export interface BudgetsRepository {
  findManyByUserId(userId: string): Promise<Budget[]>;
  findByYearAndMonth(
    userId: string,
    year: number,
    month: number
  ): Promise<Budget | null>;
  findById(id: string): Promise<Budget | null>;
  update(data: Prisma.BudgetUncheckedUpdateInput): Promise<Budget>;
  create(data: Prisma.BudgetUncheckedCreateInput): Promise<Budget>;
  deleteById(id: string): Promise<void>;
}
