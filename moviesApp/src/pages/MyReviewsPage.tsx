import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import Header from "../components/headerMovieList";

interface Review {
  ReviewId: number;
  ReviewerId: string;
  ReviewDate: string;
  Content: string;
  MovieId?: number;
  TVSeriesId?: number;
  Title?: string;
  name?: string;
  TVSeriesTitle?: string;
}

const MyReviewsPage: React.FC = () => {
  const [movieReviews, setMovieReviews] = useState<Review[]>([]);
  const [tvSeriesReviews, setTvSeriesReviews] = useState<Review[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReviews = async () => {
      if (!token || !username) {
        setError("You must be signed in to view your reviews.");
        setLoading(false);
        return;
      }

      try {
        const credentials = fromCognitoIdentityPool({
          clientConfig: { region: "eu-west-1" },
          identityPoolId: "eu-west-1:0374f1d3-94a9-49eb-8004-0f3135625c2a",
          logins: {
            "cognito-idp.eu-west-1.amazonaws.com/eu-west-1_qSJ2S2w7W": token,
          },
        });

        const client = new DynamoDBClient({ region: "eu-west-1", credentials });
        const docClient = DynamoDBDocumentClient.from(client);

        const movieCmd = new QueryCommand({
          TableName: "MovieReviews",
          IndexName: "ReviewerId-index",
          KeyConditionExpression: "ReviewerId = :user",
          ExpressionAttributeValues: {
            ":user": username,
          },
        });

        const tvCmd = new QueryCommand({
          TableName: "TVSeriesReviews",
          IndexName: "ReviewerId-index",
          KeyConditionExpression: "ReviewerId = :user",
          ExpressionAttributeValues: {
            ":user": username,
          },
        });

        const [movieData, tvData] = await Promise.all([
          docClient.send(movieCmd),
          docClient.send(tvCmd),
        ]);

        setMovieReviews(movieData.Items as Review[]);
        setTvSeriesReviews(tvData.Items as Review[]);
      } catch (err) {
        console.error(err);
        setError("Failed to load your reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [token, username]);

  return (
    <div>
    <Header title="REVIEWS" />
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
      
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Movie Reviews
          </Typography>
          {movieReviews.length === 0 ? (
            <Typography>No movie reviews submitted.</Typography>
          ) : (
            movieReviews.map((review) => (
                <Box
                key={review.ReviewId}
                sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {review.name || review.TVSeriesTitle || "Untitled"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  On {review.ReviewDate}
                </Typography>
                <Typography>{review.Content}</Typography>
              </Box>
            ))
          )}

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6">TV Series Reviews</Typography>
          {tvSeriesReviews.length === 0 ? (
            <Typography>No TV series reviews submitted.</Typography>
          ) : (
            tvSeriesReviews.map((review) => (
                <Box
                    key={review.ReviewId}
                    sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
                >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {review.name || review.TVSeriesTitle || "Untitled"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  On {review.ReviewDate}
                </Typography>
                <Typography>{review.Content}</Typography>
              </Box>
            ))
          )}
        </>
      )}
    </Box>
    </div>
  );
};

export default MyReviewsPage;
