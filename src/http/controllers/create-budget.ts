import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { CreateBudgetService } from "@/services/create-budget";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaBudgetsRepository } from "@/repositories/prisma/prisma-budgets-repostiory";
import { BudgetDateAlreadyExistsError } from "@/services/errors/budget-date-already-exists-error";

export async function createBudget(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createBudgetBodySchema = z.object({
    amountInCents: z.number(),
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

    throw err;
  }

  return reply.status(201).send();
}
