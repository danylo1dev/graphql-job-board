import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const apollo = new ApolloServer({});

await apollo.start();
app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
