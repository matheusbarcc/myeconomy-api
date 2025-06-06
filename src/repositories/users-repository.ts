import { Prisma, User } from "generated/prisma";

export interface UpdateUserParams {
  userId: string
  name: string
  email: string
  birthday: Date
}

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
  update(user: UpdateUserParams): Promise<User>
  create(data: Prisma.UserCreateInput): Promise<User>
}