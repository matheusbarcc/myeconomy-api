import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { FetchUserExpensesService } from "@/services/fetch-user-expenses";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchUserExpenses(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteBudgetBodySchema = z.object({
    date: z.coerce.date().optional(),
  });

  const { date } = deleteBudgetBodySchema.parse(request.params);

  const expensesRepository = new PrismaExpensesRepository();
  const fetchUserExpensesService = new FetchUserExpensesService(
    expensesRepository
  );

  const { expenses } = await fetchUserExpensesService.execute({
    userId: request.user.sub,
    date,
  });

  return reply.status(200).send({
    expenses,
  });
}
