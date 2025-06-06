import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { submitReview } from "../../aws/submitReview";
import { getMovie } from "../../api/tmdb-api";

interface ReviewFormProps {
  movieId: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ movieId }) => {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [movieName, setMovieName] = useState("");
  const [loading, setLoading] = useState(false);
  const isLoggedIn = !!localStorage.getItem("awsCredentials");
 useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await getMovie(movieId.toString());
        setMovieName(movie.title || "Unknown");
      } catch (err) {
        console.error("Failed to load movie info", err);
        setError("Failed to load movie info.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      await submitReview({
        movieId,
        reviewerEmail: localStorage.getItem("username") || "anonymous",
        content,
        date: new Date().toISOString().split("T")[0],
        name: movieName,
      }); 
      
      console.log("Review submitted via DynamoDB directly.");
      setOpen(true);
      setContent("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit review. Try again.");
    }
  };
  

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Write a Review
      </Typography>
      {!isLoggedIn ? (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Please sign in to submit a review.
        </Alert>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Review"
            multiline
            rows={4}
            fullWidth
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" color="primary">
            Submit Review
          </Button>
        </form>
      )}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setOpen(false)}>
          Review submitted successfully!
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default ReviewForm;
