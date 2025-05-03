import {
    DynamoDBClient,
  } from "@aws-sdk/client-dynamodb";
  import {
    DynamoDBDocumentClient,
    PutCommand,
  } from "@aws-sdk/lib-dynamodb";
  import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
  
  interface FantasyMovie {
    MovieId: number;
    Title: string;
    Overview: string;
    Genre: string;
    ReleaseDate: string;
    Runtime: string;
    ProductionCompanies: string;
    Username: string;
  }
  
  export const uploadFantasyMovie = async (movie: FantasyMovie) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");
  
    const credentials = fromCognitoIdentityPool({
      clientConfig: { region: "eu-west-1" },
      identityPoolId: "eu-west-1:0374f1d3-94a9-49eb-8004-0f3135625c2a",
      logins: {
        "cognito-idp.eu-west-1.amazonaws.com/eu-west-1_qSJ2S2w7W": token,
      },
    });
  
    const client = new DynamoDBClient({
      region: "eu-west-1",
      credentials,
    });
  
    const docClient = DynamoDBDocumentClient.from(client);
  
    const command = new PutCommand({
      TableName: "FantasyMovies",
      Item: movie,
    });
  
    await docClient.send(command);
  };
  