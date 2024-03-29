import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/resolvers.js";
import { getUser } from "./db/users.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefs = await readFileSync("./schema.graphql", "utf-8");

const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();

async function getContext(req) {
  if (req.auth) {
    const user = getUser(req.auth.sub);
    return { user };
  }
  return {};
}
app.use("/graphql", expressMiddleware(apollo, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
