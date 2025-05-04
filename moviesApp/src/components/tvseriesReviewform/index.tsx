import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { postTVSeriesReview } from "../../aws/postTVSeriesReview";
import { useParams } from "react-router-dom";
import Header from "../headerMovieList";
import { getTVSeries } from "../../api/tmdb-api";

const TVSeriesReviewForm: React.FC = () => {
  const { id } = useParams();
  const tvSeriesId = id ? parseInt(id) : 0;

  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [tvSeriesName, setTvSeriesName] = useState("");
  const [loading, setLoading] = useState(false);
  const isLoggedIn = !!localStorage.getItem("awsCredentials");
  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        const series = await getTVSeries(tvSeriesId.toString());
        setTvSeriesName(series.name || "Unknown");
      } catch (err) {
        console.error("Failed to load series info", err);
        setError("Failed to load TV series info.");
      } finally {
        setLoading(false);
      }
    };
    fetchTVSeries();
  }, [tvSeriesId]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await postTVSeriesReview({
        tvSeriesId,
        reviewerEmail: localStorage.getItem("username") || "anonymous",
        content,
        date: new Date().toISOString().split("T")[0],
        name: tvSeriesName,
      });

      setOpen(true);
      setContent("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit review. Try again.");
    }
  };

  return (
    <div>
    <Header title="TV Series Review"/>
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
    </div>
  );
};

export default TVSeriesReviewForm;
