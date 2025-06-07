export class BudgetBeforeCurrentDateError extends Error {
  constructor() {
    super("Você não pode criar/editar/excluir limites de datas passadas.");
  }
}
