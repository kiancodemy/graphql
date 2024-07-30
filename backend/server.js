import express from "express";
import { Transaction } from "./models/transaction.js";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { User } from "./models/usermodel.js";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { connecter } from "./connect/connect.js";
import dotenv from "dotenv";
import { LoginVerify } from "./function/verify.js";

import jwt from "jsonwebtoken";
import mergedTypeDefs from "./types/imdex.js";
import mergedResolvers from "./resolvers/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
dotenv.config();

import cors from "cors";

const app = express();

connecter();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,

  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  "/graphql",

  cors({
    origin: process.env.FRONT,
    credentials: true,
  }),
  express.json(),
  cookieParser(),

  expressMiddleware(server, {
    context: async ({ req, res }) => ({
      User: User,
      Transaction: Transaction,
      verfiy: async () => {
        return await LoginVerify(req);
      },
      setter: (token) => {
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 700 * 365 * 24 * 60 * 60 * 1000,
          SameSite: "None",
          secure: process.env.NODE_ENV !== "development",
        });
      },

      outer: () => {
        res.cookie("jwt", "");
      },
    }),
  })
);
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at 4000`);
