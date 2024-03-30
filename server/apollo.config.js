import { readFileSync } from "fs";
import { resolvers } from "./resolvers/resolvers.js";
import { getUser } from "./db/users.js";
import { createCompanyLoader } from "./db/companies.js";
import { ApolloServer } from "@apollo/server";

const typeDefs = await readFileSync("./schema.graphql", "utf-8");

export const apollo = new ApolloServer({ typeDefs, resolvers });
export async function getContext(req) {
  const companyLoader = createCompanyLoader();
  const context = { companyLoader };
  if (req.auth) {
    context.user = await getUser(req.auth.sub);
    return context;
  }
  return context;
}
