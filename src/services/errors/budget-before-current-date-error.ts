export class BudgetBeforeCurrentDateError extends Error {
  constructor() {
    super("Você não pode criar/editar limites de datas passadas.");
  }
}
