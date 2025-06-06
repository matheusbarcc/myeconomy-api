import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error"
import { UpdateUserService } from "@/services/update-user"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    birthday: z.coerce.date(),
  })

  const { name, email, birthday } = updateUserBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const updateUserService = new UpdateUserService(usersRepository)

    await updateUserService.execute({
      userId: request.user.sub,
      name,
      email,
      birthday,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}