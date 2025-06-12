import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { SignUpService } from "@/services/sign-up";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const signUpBodySchema = z
    .object({
      name: z.string().min(1, "O nome é obrigatório"),
      email: z
        .string()
        .min(1, "O e-mail é obrigatório")
        .email("E-mail inválido"),
      birthday: z.coerce.date(),
      password: z.string().min(3, "A senha deve ter pelo menos 3 caracteres"),
      password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      path: ["password_confirmation"],
      message: "A confirmação da senha não confere",
    });

  const { name, email, birthday, password } = signUpBodySchema.parse(
    request.body
  );

  try {
    const usersRepository = new PrismaUsersRepository();
    const signUpService = new SignUpService(usersRepository);

    await signUpService.execute({
      name,
      email,
      birthday,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
