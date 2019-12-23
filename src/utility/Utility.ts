const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const utility: any = {};

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

function sortByKey(a: any, b: any) {
  const a_key: any = Object.keys(a);
  const b_key: any = Object.keys(b);

  if (a_key == b_key) return 0;
  return a_key > b_key ? 1 : -1;
}

function sortByValue(a: any, b: any) {
  const a_key: any = Object.keys(a);
  const a_value = a[a_key];
  const b_key: any = Object.keys(b);
  const b_value = b[b_key];

  if (a_value == b_value) return 0;
  return a_value > b_value ? 1 : -1;
}

utility.performSort = (data: Array<object>, orderBy: string) => {
  if (orderBy.toLowerCase() === "key") {
    return data.sort(sortByKey);
  } else {
    return data.sort(sortByValue);
  }
};

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
module.exports = utility;
