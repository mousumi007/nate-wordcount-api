import * as axios from "axios";

const utility = require("../utility/Utility");

export class HttpRequests {
  private finalResponse: Array<object>;

  constructor() {
    this.finalResponse = [];
  }

  async getRequest(url: string) {
    try {
      const response = await axios.default.get(url);

      const responseMap = utility.countWords(response.data);

      for (let [key, value] of responseMap) {
        const tempObj: any = {};
        tempObj[key] = value;
        this.finalResponse.push(tempObj);
      }

      return this.finalResponse;
    } catch (error) {
      const errorObj = {
        status: error.response.status,
        message: error.message
      };
      throw errorObj;
    }
  }
}
