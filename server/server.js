import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/resolvers.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefs = await readFileSync("./schema.graphql", "utf-8");

const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();

app.use("/graphql", expressMiddleware(apollo));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
