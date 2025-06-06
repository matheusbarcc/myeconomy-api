import { FastifyInstance } from "fastify";
import { signUp } from "./controllers/sign-up";
import { signIn } from "./controllers/sign-in";
import { verifyJWT } from "./middlewares/verify-jwt";
import { getUserDetails } from "./controllers/get-user-details";
import { updateUser } from "./controllers/update-user";

export async function appRoutes(app: FastifyInstance) {
  // public
  app.post("/signup", signUp);
  app.post("/signin", signIn);

  // private
  app.get("/me", { onRequest: [verifyJWT] }, getUserDetails);
  app.put("/me", { onRequest: [verifyJWT] }, updateUser);
}
