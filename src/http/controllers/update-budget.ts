import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { UpdateBudgetService } from "@/services/update-budget";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaBudgetsRepository } from "@/repositories/prisma/prisma-budgets-repostiory";
import { BudgetDateAlreadyExistsError } from "@/services/errors/budget-date-already-exists-error";
import { BudgetBeforeCurrentDateError } from "@/services/errors/budget-before-current-date-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UserNotAllowedError } from "@/services/errors/user-not-allowed-error";

export async function updateBudget(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateBudgetBodySchema = z.object({
    id: z.string(),
    amountInCents: z.number(),
    date: z.coerce.date(),
  });

  const { id, amountInCents, date } = updateBudgetBodySchema.parse(
    request.body
  );

  try {
    const budgetsRepository = new PrismaBudgetsRepository();
    const updateBudgetService = new UpdateBudgetService(budgetsRepository);

    await updateBudgetService.execute({
      budgetId: id,
      amountInCents,
      date,
      userId: request.user.sub,
    });
  } catch (err) {
    if (err instanceof BudgetBeforeCurrentDateError) {
      return reply.status(400).send({ message: err.message });
    }

    if (err instanceof UserNotAllowedError) {
      return reply.status(401).send({ message: err.message });
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }

    if (err instanceof BudgetDateAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(204).send();
}
