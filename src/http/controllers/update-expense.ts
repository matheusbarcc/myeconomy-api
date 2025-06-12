import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { ExpenseBeforeCurrentDateError } from "@/services/errors/expense-before-current-date-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UserNotAllowedError } from "@/services/errors/user-not-allowed-error";
import { UpdateExpenseService } from "@/services/update-expense";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateExpense(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateExpenseBodySchema = z.object({
    id: z.string().min(1, "O id é obrigatório."),
    description: z.string().min(1, "A descrição é obrigatória."),
    amountInCents: z.number().min(1, "O valor deve ser maior que zero."),
    date: z.coerce.date(),
  });

  const { id, description, amountInCents, date } =
    updateExpenseBodySchema.parse(request.body);

  try {
    const expensesRepository = new PrismaExpensesRepository();
    const updateExpenseService = new UpdateExpenseService(expensesRepository);

    await updateExpenseService.execute({
      expenseId: id,
      description,
      amountInCents,
      date,
      userId: request.user.sub,
    });
  } catch (err) {
    if (err instanceof ExpenseBeforeCurrentDateError) {
      return reply.status(400).send({ message: err.message });
    }

    if (err instanceof UserNotAllowedError) {
      return reply.status(401).send({ message: err.message });
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(204).send();
}
