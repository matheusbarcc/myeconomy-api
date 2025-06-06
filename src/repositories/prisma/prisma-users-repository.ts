import { prisma } from "@/lib/prisma";
import { UpdateUserParams, UsersRepository } from "../users-repository";
import { Prisma } from "generated/prisma";

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      }
    })

    return user
  }

  async update(data: UpdateUserParams) {
    const user = await prisma.user.update({
      where: {
        id: data.userId
      },
      data: {
        name: data.name,
        email: data.email,
        birthday: data.birthday
      }
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}