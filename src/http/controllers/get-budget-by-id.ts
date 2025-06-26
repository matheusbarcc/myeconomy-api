import { PrismaBudgetsRepository } from "@/repositories/prisma/prisma-budgets-repostiory";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UserNotAllowedError } from "@/services/errors/user-not-allowed-error";
import { GetBudgetByIdService } from "@/services/get-budget-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getBudgetById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getBudgetByIdSchema = z.object({
    budgetId: z.string(),
  });

  const { budgetId } = getBudgetByIdSchema.parse(request.params);

  try {
    const budgetsRepository = new PrismaBudgetsRepository();
    const getBudgetByIdService = new GetBudgetByIdService(budgetsRepository);

    const { budget } = await getBudgetByIdService.execute({
      budgetId,
      userId: request.user.sub,
    });

    return reply.status(200).send({
      budget,
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
