import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { InvalidCredentialsError } from "@/services/errors/invalid-crendentials-error";
import { UserNotRegistredError } from "@/services/errors/user-not-registred-error";
import { SignInService } from "@/services/sign-in";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function signIn(request: FastifyRequest, reply: FastifyReply) {
  const signInBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = signInBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const signInService = new SignInService(usersRepository);

    const { user } = await signInService.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(200).send({
      token,
    });
  } catch (err) {
    if (err instanceof UserNotRegistredError) {
      return reply.status(400).send({ message: err.message });
    }

    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
