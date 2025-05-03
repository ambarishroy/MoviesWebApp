import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

interface TVSeriesReview {
  tvSeriesId: number;
  reviewerEmail: string;
  content: string;
  date: string;
}

export async function postTVSeriesReview(review: TVSeriesReview): Promise<void> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated");
  }

  const credentials = fromCognitoIdentityPool({
    clientConfig: { region: "eu-west-1" },
    identityPoolId: "eu-west-1:0374f1d3-94a9-49eb-8004-0f3135625c2a",
    logins: {
      "cognito-idp.eu-west-1.amazonaws.com/eu-west-1_qSJ2S2w7W": token,
    },
  });

  const dynamoClient = new DynamoDBClient({
    region: "eu-west-1",
    credentials,
  });

  const docClient = DynamoDBDocumentClient.from(dynamoClient);

  const payload = {
    TVSeriesId: review.tvSeriesId,
    ReviewId: Date.now(),
    ReviewerId: review.reviewerEmail,
    ReviewDate: review.date,
    Content: review.content,
  };

  console.log("Sending to DynamoDB:", payload);

  const command = new PutCommand({
    TableName: "TVSeriesReviews",
    Item: payload,
  });

  try {
    await docClient.send(command);
  } catch (err) {
    console.error("DynamoDB error:", err);
    throw err;
  }
}
