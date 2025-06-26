export class ExpenseBeforeCurrentDateError extends Error {
  constructor() {
    super("Você não pode criar/editar/excluir despesas de meses passados.");
  }
}
