import { PrismaBudgetsRepository } from "@/repositories/prisma/prisma-budgets-repostiory";
import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { GetProgressService } from "@/services/get-user-progress";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getProgress(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteBudgetBodySchema = z.object({
    date: z.coerce.date().optional(),
  });

  const { date } = deleteBudgetBodySchema.parse(request.params);

  const budgetsRepository = new PrismaBudgetsRepository();
  const expensesRepository = new PrismaExpensesRepository();
  const getProgressService = new GetProgressService(
    budgetsRepository,
    expensesRepository
  );

  const { progress } = await getProgressService.execute({
    userId: request.user.sub,
    date,
  });

  return reply.status(200).send({
    progress,
  });
}
