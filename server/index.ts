import express from "express";
import next from "next";
import ApolloServer from "./ApolloServer";
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();

ApolloServer.applyMiddleware({ app, path: "/api/graphql" });

nextApp
  .prepare()
  .then(() => {
    app.get("*", (req, res) => {
      return handle(req, res);
    });
    app.listen(3000, () => {
      console.log("App ready on port 3000");
    });
  })
  .catch((exception) => {
    console.error(exception.stack);
    process.exit(1);
  });
