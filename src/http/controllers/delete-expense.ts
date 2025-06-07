import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { DeleteExpenseService } from "@/services/delete-expense";
import { ExpenseBeforeCurrentDateError } from "@/services/errors/expense-before-current-date-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UserNotAllowedError } from "@/services/errors/user-not-allowed-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteExpense(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteExpenseBodySchema = z.object({
    expenseId: z.string(),
  });

  const { expenseId } = deleteExpenseBodySchema.parse(request.params);

  try {
    const expensesRepository = new PrismaExpensesRepository();
    const deleteExpenseService = new DeleteExpenseService(expensesRepository);

    await deleteExpenseService.execute({
      userId: request.user.sub,
      expenseId,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }

    if (err instanceof UserNotAllowedError) {
      return reply.status(401).send({ message: err.message });
    }

    if (err instanceof ExpenseBeforeCurrentDateError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(204).send();
}
