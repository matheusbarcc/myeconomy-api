import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-crendentials-error";
import { UserNotRegistredError } from "./errors/user-not-registred-error";

interface SignInServiceRequest {
  email: string;
  password: string;
}

export class SignInService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: SignInServiceRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotRegistredError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
