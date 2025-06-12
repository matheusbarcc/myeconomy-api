import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { CreateExpenseService } from "@/services/create-expense";
import { ExpenseBeforeCurrentDateError } from "@/services/errors/expense-before-current-date-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createExpense(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createExpenseBodySchema = z.object({
    description: z.string().min(1, "A descrição é obrigatória."),
    amountInCents: z.number().min(1, "O valor deve ser maior que zero."),
    date: z.coerce.date(),
  });

  const { description, amountInCents, date } = createExpenseBodySchema.parse(
    request.body
  );

  try {
    const expensesRepository = new PrismaExpensesRepository();
    const createExpenseService = new CreateExpenseService(expensesRepository);

    await createExpenseService.execute({
      description,
      amountInCents,
      date,
      userId: request.user.sub,
    });
  } catch (err) {
    if (err instanceof ExpenseBeforeCurrentDateError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
