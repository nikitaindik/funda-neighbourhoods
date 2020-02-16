const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

const makeQueryFinishHandler = sendResponse => (error, queryResult) =>
  sendResponse(null, {
    statusCode: error ? "400" : "200",
    body: error
      ? JSON.stringify({ error: "error" })
      : JSON.stringify(queryResult.Item),
    headers: {
      "Content-Type": "application/json"
    }
  });

exports.handler = (event, context, sendResponse) => {
  const zipCode =
    event.queryStringParameters && event.queryStringParameters.zipCode;

  if (!zipCode) {
    return sendResponse(null, {
      statusCode: 400,
      body: JSON.stringify({ error: "No zipcode specified in request" })
    });
  }

  const params = {
    TableName: "zipCodeLocations",
    Key: { zipCode }
  };

  const onQueryFinish = makeQueryFinishHandler(sendResponse);

  docClient.get(params, onQueryFinish);
};
