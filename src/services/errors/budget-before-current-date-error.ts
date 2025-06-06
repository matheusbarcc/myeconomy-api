export class BudgetBeforeCurrentDateError extends Error {
  constructor() {
    super("Você não pode criar limites para datas passadas.");
  }
}
