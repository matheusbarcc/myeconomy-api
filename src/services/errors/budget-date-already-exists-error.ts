export class BudgetDateAlreadyExistsError extends Error {
  constructor() {
    super("Já existe um limite para esse mês.");
  }
}
