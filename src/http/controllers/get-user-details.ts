import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserDetailsService } from "@/services/get-user-details"
import { FastifyReply, FastifyRequest } from "fastify"

export async function getUserDetails(request: FastifyRequest, reply: FastifyReply) {
  const userRepository = new PrismaUsersRepository()
  const getUserDetailsService = new GetUserDetailsService(userRepository)

  const { user } = await getUserDetailsService.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user,
  })
}