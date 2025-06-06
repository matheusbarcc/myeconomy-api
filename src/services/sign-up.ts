import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface SignUpServiceRequest {
  name: string
  email: string
  birthday: Date
  password: string
}

export class SignUpService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ name, email, birthday, password }: SignUpServiceRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      birthday,
      password_hash
    })
  }
}