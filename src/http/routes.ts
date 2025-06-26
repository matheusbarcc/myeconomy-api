import { FastifyInstance } from "fastify";
import { signUp } from "./controllers/sign-up";
import { signIn } from "./controllers/sign-in";
import { verifyJWT } from "./middlewares/verify-jwt";
import { getUserDetails } from "./controllers/get-user-details";
import { createBudget } from "./controllers/create-budget";
import { updateBudget } from "./controllers/update-budget";
import { deleteBudget } from "./controllers/delete-budget";
import { fetchUserBudgets } from "./controllers/fetch-budgets";
import { createExpense } from "./controllers/create-expense";
import { updateExpense } from "./controllers/update-expense";
import { deleteExpense } from "./controllers/delete-expense";
import { fetchUserExpenses } from "./controllers/fetch-expenses";
import { getProgress } from "./controllers/get-progress";
import { getBudgetById } from "./controllers/get-budget-by-id";
import { getExpenseById } from "./controllers/get-expense-by-id";

export async function appRoutes(app: FastifyInstance) {
  // public
  app.post("/signup", signUp);
  app.post("/signin", signIn);

  // private
  app.get("/me", { onRequest: [verifyJWT] }, getUserDetails);

  app.get("/progress/:date?", { onRequest: [verifyJWT] }, getProgress);

  app.post("/budgets", { onRequest: [verifyJWT] }, createBudget);
  app.get("/budgets", { onRequest: [verifyJWT] }, fetchUserBudgets);
  app.get("/budgets/id/:budgetId", { onRequest: [verifyJWT] }, getBudgetById);
  app.put("/budgets", { onRequest: [verifyJWT] }, updateBudget);
  app.delete("/budgets/:budgetId", { onRequest: [verifyJWT] }, deleteBudget);

  app.post("/expenses", { onRequest: [verifyJWT] }, createExpense);
  app.get("/expenses/:date?", { onRequest: [verifyJWT] }, fetchUserExpenses);
  app.get(
    "/expenses/id/:expenseId",
    { onRequest: [verifyJWT] },
    getExpenseById
  );
  app.put("/expenses", { onRequest: [verifyJWT] }, updateExpense);
  app.delete("/expenses/:expenseId", { onRequest: [verifyJWT] }, deleteExpense);
}
