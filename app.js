import express from "express";
import cors from "cors";
import Routes from "./routes/index.js";
import { env } from "./database/config.js";

const PORT = env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    name: "hello",
    type: "working",
  });
});
Routes.map((route) => app.use(`/${route.name}`, route.path));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
