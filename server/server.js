import "dotenv/config";
import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import { expressMiddleware } from "@apollo/server/express4";
import { apollo, getContext } from "./apollo.config.js";

const PORT = process.env.PORT || 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);
await apollo.start();

app.use("/graphql", expressMiddleware(apollo, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
