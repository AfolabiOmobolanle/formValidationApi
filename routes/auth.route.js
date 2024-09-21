import { login, signup } from "../src/controllers/auth.controller.js";
import { route } from "../src/middleware/route.js";

const authRoute = route;
authRoute.post("/signup", signup);
authRoute.post("/login", login);

export default authRoute;
