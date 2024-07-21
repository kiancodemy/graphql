import express from "express";
import cookieparser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from " dotenv";
dotenv.config();
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT },
});

console.log(`🚀  Server ready at: ${url}`);
