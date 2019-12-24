import * as express from "express";
import { HttpRequests } from "../external-api-calls/HttpRequests";

const utility = require("../utility/Utility");
const router = express.Router();
const schema = require("../../schemas/request-schema.json");
const defaultSortParam = "value";

//Routing
router.post("/", async (req, res, next) => {
  try {
    //schema validation
    utility.schemaValidation(schema, req.body);

    const url: string = req.body.url;
    const order: string = req.body.orderBy || defaultSortParam;
    const httpRequestObj = new HttpRequests();

    //receive the response from http request
    const response: Array<object> = await httpRequestObj.getRequest(url);

    //sort the response before sending to client
    const orderedResponse: Array<object> = utility.performSort(response, order);

    //final sending of success response in order
    res.status(200).json({
      orderedResponse
    });
  } catch (error) {
    //Handling errors and sending to client
    res.status((error && error.status) || 500);
    res.json({
      error: {
        message: error.message || "Internal Server Error",
        errors: error.errors
      }
    });
    return res;
  }
});

module.exports = router;
