import { ApolloServer } from '@apollo/server';
import resolvers from "./resolvers/resolvers";
import { readFileSync } from "fs";

const server = new ApolloServer({
    typeDefs: readFileSync("./src/schema.graphql", "utf-8"),
    resolvers: resolvers
});

export default server;