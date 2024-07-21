import express from "express";
import cookieparser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { User } from "./models/usermodel.js";
import { connecter } from "./connect/connect.js";
import dotenv from "dotenv";

import { typeDefs } from "./types/user.js";
import { userresolvers as resolvers } from "./resolvers/user.js";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
dotenv.config();

import cors from "cors";

const app = express();
connecter();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();
app.use(
  "/graphql",
  cors({ origin: "localhost:3000", credentials: "true" }),
  express.json(),
  cookieparser(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({
      name: "kian",
      User: User,
      setter: (token) =>
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 700 * 365 * 24 * 60 * 60 * 1000,
          sameSite: "strict",
          secure: process.env.NODE_ENV !== "development",
        }),

      outer: () => {
        res.cookie("jwt", "");
      },
    }),
  })
);
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);
