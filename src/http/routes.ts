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

export async function appRoutes(app: FastifyInstance) {
  // public
  app.post("/signup", signUp);
  app.post("/signin", signIn);

  // private
  app.get("/me", { onRequest: [verifyJWT] }, getUserDetails);

  app.post("/budgets", { onRequest: [verifyJWT] }, createBudget);
  app.get("/budgets", { onRequest: [verifyJWT] }, fetchUserBudgets);
  app.put("/budgets", { onRequest: [verifyJWT] }, updateBudget);
  app.delete("/budgets/:budgetId", { onRequest: [verifyJWT] }, deleteBudget);

  app.post("/expenses", { onRequest: [verifyJWT] }, createExpense);
  app.put("/expenses", { onRequest: [verifyJWT] }, updateExpense);
  app.delete("/expenses/:expenseId", { onRequest: [verifyJWT] }, deleteExpense);
}
