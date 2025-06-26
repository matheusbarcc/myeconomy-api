import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UserNotAllowedError } from "@/services/errors/user-not-allowed-error";
import { GetExpenseByIdService } from "@/services/get-expense-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getExpenseById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getExpenseByIdSchema = z.object({
    expenseId: z.string(),
  });

  const { expenseId } = getExpenseByIdSchema.parse(request.params);

  try {
    const expensesRepository = new PrismaExpensesRepository();
    const getExpenseByIdService = new GetExpenseByIdService(expensesRepository);

    const { expense } = await getExpenseByIdService.execute({
      expenseId,
      userId: request.user.sub,
    });

    return reply.status(200).send({
      expense,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }

    if (err instanceof UserNotAllowedError) {
      return reply.status(401).send({ message: err.message });
    }
  }
}
