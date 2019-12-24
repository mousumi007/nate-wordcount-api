import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import { ResponseError } from "./types/error";

const env = process.env.NODE_ENV || "dev";
const wordCountRoute = require("./routes/WordCount");
const app = express();

//api request logging
app.use(morgan(env));

//api request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS implementation
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,content-type,Accept,Authorization"
  );
  if (request.method === "OPTIONS") {
    response.header("Access-Control-Allow-Headers", "POST,content-type");
    return response.status(204).json({});
  }
  next();
});

//api routing
app.use("/count-word", wordCountRoute);

//Error handling
app.use((request, response, next) => {
  const error: ResponseError = new Error("Not Found");
  error.status = 404;
  next(error);
});

//Error handling
app.use(
  (
    error: ResponseError,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    response.status((error && error.status) || 500);
    response.json({
      error: {
        message: error.message || "Internal Server Error"
      }
    });
  }
);

module.exports = app;
