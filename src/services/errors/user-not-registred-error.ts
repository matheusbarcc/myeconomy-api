export class UserNotRegistredError extends Error {
  constructor() {
    super("Usuário não cadastrado.")
  }
}