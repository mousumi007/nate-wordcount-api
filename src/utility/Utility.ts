const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const utility: any = {};

/** function to count the word occurences in string */
utility.countWords = (sentence: string): Map<string, number> => {
  const map: Map<string, number> = new Map<string, number>();

  //exclude  start and end white-space
  sentence = sentence.replace(/(^\s*)|(\s*$)/gi, "");
  //2 or more space to 1
  sentence = sentence.replace(/[ ]{2,}/gi, " ");
  // exclude newline globally  with a start spacing
  sentence = sentence.replace(/\n+/g, " ");
  //remove all special characters
  sentence = sentence.replace(/[^a-zA-Z0-9 ]/g, " ").toLowerCase();

  const words: string[] = sentence.split(" ");

  for (const word of words) {
    if (word !== "") {
      if (map.has(word)) {
        map.set(word, map.get(word) + 1);
      } else {
        map.set(word, 1);
      }
    }
  }

  return map;
};

// function to sort by key
function sortByKey(a: any, b: any) {
  if (a.key == b.key) return 0;
  return a.key > b.key ? 1 : -1;
}

// function to sort by value
function sortByValue(a: any, b: any) {
  if (a.count == b.count) return 0;
  return a.count > b.count ? 1 : -1;
}

// function to determine whether to sort by key or value
utility.performSort = (data: Array<object>, orderBy: string) => {
  if (orderBy.toLowerCase() === "key") {
    return data.sort(sortByKey);
  } else {
    return data.sort(sortByValue);
  }
};

//function for request schema validation
utility.schemaValidation = (schema: any, data: any) => {
  const validate = ajv.compile(schema);

  if (!validate(data)) {
    let errors = [];

    for (let e of validate.errors) {
      errors.push(e);
    }
    let response = {
      status: 400,
      message: "JSON Schema Validation error",
      errors: errors
    };

    throw response;
  } else {
    return true;
  }
};

//function to format http response from Map to Array<object>
utility.formatResponse = (data: Map<string, number>) => {
  let formattedResponse: Array<object> = [];

  for (let [key, value] of data) {
    const tempObj = {
      key: key,
      count: value
    };
    formattedResponse.push(tempObj);
  }

  return formattedResponse;
};

module.exports = utility;
