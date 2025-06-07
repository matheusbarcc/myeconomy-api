import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma";
import { ExpensesRepository } from "../expenses-repository";

export class PrismaExpensesRepository implements ExpensesRepository {
  async findManyByUserIdAndDate(userId: string, date?: Date) {
    const year = date?.getUTCFullYear();
    const month = date?.getUTCMonth();

    const expenses = await prisma.expense.findMany({
      where: date
        ? {
            user_id: userId,
            date: {
              gte: new Date(Date.UTC(year!, month!, 1)),
              lt: new Date(Date.UTC(year!, month! + 1, 1)),
            },
          }
        : {
            user_id: userId,
          },
      orderBy: {
        date: "desc",
      },
    });

    return expenses;
  }

  async findById(id: string) {
    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    return expense;
  }

  async update(data: Prisma.ExpenseUncheckedUpdateInput) {
    const expense = await prisma.expense.update({
      where: {
        id: data.id as string,
      },
      data: {
        description: data.description,
        amount_in_cents: data.amount_in_cents,
        date: data.date,
      },
    });

    return expense;
  }

  async create(data: Prisma.ExpenseUncheckedCreateInput) {
    const expense = await prisma.expense.create({
      data,
    });

    return expense;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.expense.delete({
      where: {
        id,
      },
    });
  }
}
