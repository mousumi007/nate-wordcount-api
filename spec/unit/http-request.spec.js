"use strict";
jasmine.getEnv().addReporter(require(process.cwd() + "/spec/support/reporter"));

const expect = require("chai").expect;

const HttpRequests = require("../../dist/external-api-calls/HttpRequests")
  .HttpRequests;

describe("Unit Test - HttpRequest handler:", function() {
  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  });

  it("should fetch content when a valid url is provided", async () => {
    const validURL = "https://norvig.com/big.txt";
    const obj = new HttpRequests();
    const response = await obj.getRequest(validURL);
    expect(response).to.be.an("array");
  });

  it("should throw 404 error incase of invalid url", async () => {
    try {
      const invalidURL = "https://norvig.com/bigg.txt";
      const obj = new HttpRequests();
      await obj.getRequest(invalidURL);
    } catch (error) {
      expect(error.message).eq("Request failed with status code 404");
      expect(error.status).eq(404);
    }
  });
});
