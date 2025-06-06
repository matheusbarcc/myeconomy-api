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

- [ ] GET /progress/{ date }
  - res: { date, spent, budget, status: 'ongoing' | 'completed' }
  - obs: se nao passar date, retorna com data atual 

### Limites

- [ ] POST /budgets
  - req: { amount, date }

- [ ] PUT /budgets
  - req: { id, amount, date }

- [ ] DELETE /budgets/{ id }

- [ ] GET /budgets
  - res: { id, amount, date }[]

### Despesas

- [ ] POST /expenses
  - req: { description, amount, date }

- [ ] PUT /expenses
  - req: { id, description, amount, date }

- [ ] DELETE /expenses/{ id }

- [ ] GET /expenses/{ date }
  - res: { id, amount, date }[]
  - obs: se passar date retorna apenas as despesas do mes, se nao retorna todas
