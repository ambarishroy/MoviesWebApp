import React, { useEffect, useState } from "react";
import { Alert, Typography, Box } from "@mui/material";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

interface Props {
  movieId: number;
}

interface Review {
  ReviewId: number;
  ReviewerId: string;
  ReviewDate: string;
  Content: string;
}

const MovieReviewsList: React.FC<Props> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const credentials = fromCognitoIdentityPool({
          clientConfig: { region: "eu-west-1" },
          identityPoolId: "eu-west-1:0374f1d3-94a9-49eb-8004-0f3135625c2a",
          logins: {
            "cognito-idp.eu-west-1.amazonaws.com/eu-west-1_qSJ2S2w7W": token,
          },
        });

        const client = new DynamoDBClient({ region: "eu-west-1", credentials });
        const docClient = DynamoDBDocumentClient.from(client);

        const command = new QueryCommand({
          TableName: "MovieReviews",
          KeyConditionExpression: "MovieId = :movieId",
          ExpressionAttributeValues: {
            ":movieId": movieId,
          },
        });

        const result = await docClient.send(command);
        setReviews(result.Items as Review[]);
      } catch (err) {
        console.error(err);
        setError("Failed to load movie reviews.");
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Reviews</Typography>
      {reviews.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        reviews.map((review) => (
          <Box key={review.ReviewId} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <Typography variant="body2" color="textSecondary">
              {review.ReviewerId} on {review.ReviewDate}
            </Typography>
            <Typography>{review.Content}</Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default MovieReviewsList;
