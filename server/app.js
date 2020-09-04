if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
  require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const session = require("express-session");
const connectRedis = require("connect-redis");
const Redis = require("ioredis");
const MONGODB = process.env.MONGO_CONNECTION_STRING;

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const isAuth = require("./middleware/is-auth");
const { COOKIE_NAME, __prod__ } = require("./constants");

const app = express();

async function startApp() {
  try {
    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({ req, res, redis }),
    });
    await mongoose.connect(MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //middleware
    app.use(bodyParser.json());
    app.set("trust proxy", 1);
    app.use(
      cors({
        origin:
          process.env.ORIGIN ||
          process.env.CORS_ORIGIN ||
          "http://localhost:3000",
        credentials: true,
      }),
    );
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Methods', 'POST,GET,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      next();
    });
    app.use(
      session({
        name: COOKIE_NAME,
        store: new RedisStore({
          client: redis,
          disableTouch: true,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
          httpOnly: true,
          sameSite: __prod__ ? "none" : "lax", // csrf
          secure: __prod__, // cookie only works in https
          domain: undefined,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
      }),
    );
    //app.use(isAuth);

    apolloServer.applyMiddleware({
      app,
      cors: false,
    });
    app.listen({ port: process.env.PORT }, () => {
      const serverUrl = `http://localhost:${process.env.PORT}`;
      console.log(`Server started on ${serverUrl}`);
      console.log(`Graphql playground can be found at ${serverUrl}/graphql`);
    });
  } catch (err) {
    console.log(err);
  }
}
startApp();
