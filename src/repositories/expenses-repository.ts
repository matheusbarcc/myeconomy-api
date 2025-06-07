import { Prisma, Expense } from "generated/prisma";

export interface ExpensesRepository {
  findManyByUserIdAndDate(userId: string, date?: Date): Promise<Expense[]>;
  findById(id: string): Promise<Expense | null>;
  update(data: Prisma.ExpenseUncheckedUpdateInput): Promise<Expense>;
  create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense>;
  deleteById(id: string): Promise<void>;
}
