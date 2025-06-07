## Regras de negócio
- Não deve ser possível criar/editar despesas nos meses anteriores ao mês corrente;
- Só deve ser possível criar um limite por mês;
- Não deve ser possível criar/editar limites de meses anteriores ao mês corrente;
- Deve ser possível editar e excluir um limite criado do mês *corrente ou superior*.

## Rotas públicas

- [x] POST /signin
  - req: { email, password, passwordConfirmation }

- [x] POST /signup
  - req: { name, email, birthday, password }

## Rotas privadas

- [X] GET /progress/{ date }
  - res: { date, spentInCents, budgetInCents, status: 'ongoing' | 'completed' | 'pending' }
  - obs: se nao passar date, retorna com data atual 

### Limites

- [X] POST /budgets
  - req: { amountInCents, date }

- [X] PUT /budgets
  - req: { id, amountInCents, date }

- [X] DELETE /budgets/{ id }

- [X] GET /budgets
  - res: { id, amountInCents, date }[]

### Despesas

- [X] POST /expenses
  - req: { description, amountInCents, date }

- [X] PUT /expenses
  - req: { id, description, amountInCents, date }

- [X] DELETE /expenses/{ id }

- [X] GET /expenses/{ date }
  - res: { id, amountInCents, date }[]
  - obs: se passar date retorna apenas as despesas do mes, se nao, retorna todas
