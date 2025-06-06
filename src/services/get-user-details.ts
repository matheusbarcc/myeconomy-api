import { UsersRepository } from "@/repositories/users-repository"
import { UserNotFoundError } from "./errors/user-not-found-error"

interface GetUserDetailsServiceRequest {
  userId: string
}

export class GetUserDetailsService {
  constructor(private userRepository: UsersRepository) { }

  async execute({
    userId,
  }: GetUserDetailsServiceRequest) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return {
      user: {
        ...user,
        id: undefined,
        created_at: undefined,
        password_hash: undefined
      }
    }
  }
}