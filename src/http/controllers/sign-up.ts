import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error"
import { SignUpService } from "@/services/sign-up"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const signUpBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    birthday: z.coerce.date(),
    password: z.string().min(3)
  })

  const { name, email, birthday, password } = signUpBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const signUpService = new SignUpService(usersRepository)

    await signUpService.execute({
      name,
      email,
      birthday,
      password
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}