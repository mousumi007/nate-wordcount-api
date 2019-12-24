import * as axios from "axios";

const utility = require("../utility/Utility");

//Class for http request calls
export class HttpRequests {
  constructor() {}

  //method actually executing http get request and returning response
  async getRequest(url: string) {
    try {
      //http get call
      const response = await axios.default.get(url);

      //converting the http response to a map and counting the word occurences
      const responseMap: Map<string, number> = utility.countWords(
        response.data
      );

      //format the response in key-value pair
      const formattedResponse: Array<object> = utility.formatResponse(
        responseMap
      );

      return formattedResponse;
    } catch (error) {
      //Error Handling
      const errorObj = {
        status: (error.response && error.response.status) || "500",
        message: error.message || "Invalid host name"
      };
      throw errorObj;
    }
  }
}
