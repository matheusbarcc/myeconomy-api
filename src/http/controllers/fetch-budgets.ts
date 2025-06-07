import { PrismaBudgetsRepository } from "@/repositories/prisma/prisma-budgets-repostiory";
import { FetchUserBudgetsService } from "@/services/fetch-user-budgets";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchUserBudgets(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const budgetsRepository = new PrismaBudgetsRepository();
  const fetchUserBudgetsService = new FetchUserBudgetsService(
    budgetsRepository
  );

  const { budgets } = await fetchUserBudgetsService.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    budgets,
  });
}
