if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
  require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const { ApolloServer } = require("apollo-server-express")
const MONGODB = process.env.MONGO_CONNECTION_STRING

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")
const isAuth = require('./middleware/is-auth');

const PORT = 5000

const app = express()

async function startApp() {
  try {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({ req, res }),
    })
    await mongoose.connect(MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    //middleware
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Methods', 'POST,GET,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      next();
    });
    app.use(isAuth);

    apolloServer.applyMiddleware({
      app,
    })
    app.listen({ port: PORT }, () => {
      const serverUrl = `http://localhost:${PORT}`
      console.log(`Server started on ${serverUrl}`)
      console.log(`Graphql playground can be found at ${serverUrl}/graphql`)
    })
  } catch (err) {
    console.log(err)
  }
}
startApp()
