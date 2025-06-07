import { PrismaBudgetsRepository } from "@/repositories/prisma/prisma-budgets-repostiory";
import { DeleteBudgetService } from "@/services/delete-budget";
import { BudgetBeforeCurrentDateError } from "@/services/errors/budget-before-current-date-error";
import { BudgetDateAlreadyExistsError } from "@/services/errors/budget-date-already-exists-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UserNotAllowedError } from "@/services/errors/user-not-allowed-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteBudget(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteBudgetBodySchema = z.object({
    budgetId: z.string(),
  });

  const { budgetId } = deleteBudgetBodySchema.parse(request.params);

  try {
    const budgetsRepository = new PrismaBudgetsRepository();
    const deleteBudgetService = new DeleteBudgetService(budgetsRepository);

    await deleteBudgetService.execute({
      userId: request.user.sub,
      budgetId,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }

    if (err instanceof UserNotAllowedError) {
      return reply.status(401).send({ message: err.message });
    }

    if (err instanceof BudgetBeforeCurrentDateError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(204).send();
}
