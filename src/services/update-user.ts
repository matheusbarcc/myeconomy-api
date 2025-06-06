import { UsersRepository } from "@/repositories/users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface UpdateUserServiceRequest {
  userId: string
  name: string
  email: string
  birthday: Date
}

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ name, email, birthday, userId }: UpdateUserServiceRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail && userWithSameEmail.id !== userId) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.update({
      userId,
      name,
      email,
      birthday,
    })
  }
}