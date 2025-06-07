import { FastifyInstance } from "fastify";
import { signUp } from "./controllers/sign-up";
import { signIn } from "./controllers/sign-in";
import { verifyJWT } from "./middlewares/verify-jwt";
import { getUserDetails } from "./controllers/get-user-details";
import { createBudget } from "./controllers/create-budget";
import { updateBudget } from "./controllers/update-budget";

export async function appRoutes(app: FastifyInstance) {
  // public
  app.post("/signup", signUp);
  app.post("/signin", signIn);

  // private
  app.get("/me", { onRequest: [verifyJWT] }, getUserDetails);

  app.post("/budgets", { onRequest: [verifyJWT] }, createBudget);
  app.put("/budgets", { onRequest: [verifyJWT] }, updateBudget);
}
