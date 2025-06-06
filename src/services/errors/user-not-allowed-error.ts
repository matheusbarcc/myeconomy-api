export class UserNotAllowedError extends Error {
  constructor() {
    super("Usuário não autorizado.")
  }
}