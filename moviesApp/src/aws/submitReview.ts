import {
    DynamoDBClient,
    PutItemCommand,
  } from "@aws-sdk/client-dynamodb";
  import { Credentials } from "@aws-sdk/types";
  
  export const submitReview = async ({
    movieId,
    reviewerEmail,
    content,
    date,
  }: {
    movieId: number;
    reviewerEmail: string;
    content: string;
    date: string;
  }) => {
    const rawCreds = localStorage.getItem("awsCredentials");
  
    if (!rawCreds) {
      throw new Error("No AWS credentials found. Please sign in again.");
    }
  
    const parsedCreds = JSON.parse(rawCreds) as Credentials;

    const ddbClient = new DynamoDBClient({
    region: "eu-west-1",
    credentials: {
        accessKeyId: parsedCreds.accessKeyId,
        secretAccessKey: parsedCreds.secretAccessKey,
        sessionToken: parsedCreds.sessionToken,
        expiration: parsedCreds.expiration ? new Date(parsedCreds.expiration) : undefined,
    },
    });

  
    const command = new PutItemCommand({
      TableName: "MovieReviews",
      Item: {
        movieId: { N: movieId.toString() },
        reviewId: { N: Date.now().toString() },
        ReviewerId: { S: reviewerEmail },
        ReviewDate: { S: date },
        Content: { S: content },
      },
    });
  
    await ddbClient.send(command);
  };
  