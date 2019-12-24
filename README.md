## Word Count API

This API will return the ocurences of word in the below mentioned format. The API may take an optional parameter 'orderBy' which
if provided will sort the results either on 'key' or 'value'. Default ordering is by 'value'.

## Http Codes

200 -- Success
400 -- For any schema related errors
404 -- Not Found
500 -- Internal Server Error , not able to connect with the requested url

## Endpoints Summary

| Methods | Endpoint     | Summary                                           |
| ------- | ------------ | ------------------------------------------------- |
| POST    | /count-word/ | Returns the count of all words present in the url |

## Endpoint Requests & Responses

### POST - /word-count/

This endpoint creates notififcation preferences for the user

```
// Example request body:
{
	"url": "https://norvig.com/big.txt",
	"orderBy": "value"
}

```

```
// Example response:

{
    "orderedResponse": [
       {
            "key": "testified",
            "count": 1
        },
        {
            "key": "min",
            "count": 2
        }
    ]
}
```

## Installation & Running Locally

```
npm install
```

Navigate into the root of the project and run 'npm install' to install all dependencies

```
npm run start
```

Then run 'npm run start' which will deploy the endpoint on your localhost on port 3000.
You will now be able to test the API on http://localhost:3000/count-word/

## Testing

```
npm run test
```

The 'npm run test' command will run all unit tests within the spec/unit folder showing which tests passed or failed.
This command will not display the coverage percentage

```
npm run coverage
```

The 'npm run coverage' command will run all unit tests within the spec/unit folder and display the coverage percentage.
