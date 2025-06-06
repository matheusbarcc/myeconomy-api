export class BudgetDateAlreadyExistsError extends Error {
  constructor() {
    super("Já existe um limite com essa data.");
  }
}
