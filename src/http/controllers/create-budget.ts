import { PrismaBudgetsRepository } from "@/repositories/prisma/prisma-budgets-repostiory";
import { CreateBudgetService } from "@/services/create-budget";
import { BudgetBeforeCurrentDateError } from "@/services/errors/budget-before-current-date-error";
import { BudgetDateAlreadyExistsError } from "@/services/errors/budget-date-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createBudget(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createBudgetBodySchema = z.object({
    amountInCents: z.number().min(1, "O valor deve ser maior que zero."),
    date: z.coerce.date(),
  });

  const { amountInCents, date } = createBudgetBodySchema.parse(request.body);

  try {
    const budgetsRepository = new PrismaBudgetsRepository();
    const createBudgetService = new CreateBudgetService(budgetsRepository);

    await createBudgetService.execute({
      amountInCents,
      date,
      userId: request.user.sub,
    });
  } catch (err) {
    if (err instanceof BudgetDateAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof BudgetBeforeCurrentDateError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
