import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import Header from "../components/headerMovieList";
import { uploadFantasyMovie } from "../aws/uploadFantasyMovie";

const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy",
  "Horror", "Romance", "Sci-Fi", "Thriller"
];

const FantasyMoviePage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    genre: "",
    releaseDate: "",
    runtime: "",
    productionCompanies: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const username = localStorage.getItem("username");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("You must be signed in to submit a fantasy movie.");
      return;
    }
    const newMovie = {
      MovieId: Date.now(),
      Title: formData.title,
      Overview: formData.overview,
      Genre: formData.genre,
      ReleaseDate: formData.releaseDate,
      Runtime: formData.runtime,
      ProductionCompanies: formData.productionCompanies,
      Username: username || "",
    };
    try {
      await uploadFantasyMovie(newMovie);

      setFormData({
        title: "",
        overview: "",
        genre: "",
        releaseDate: "",
        runtime: "",
        productionCompanies: "",
      });
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload movie. Please try again.");
    }
  };

  return (
    <div>
      
      <Header title="Your fantasy movie" />
      
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 4 }}>
        {!isLoggedIn && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Please sign in to submit a fantasy movie.
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
                disabled={!isLoggedIn}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="overview"
                label="Overview"
                value={formData.overview}
                onChange={handleChange}
                required
                multiline
                rows={4}
                fullWidth
                disabled={!isLoggedIn}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                name="genre"
                label="Genre"
                value={formData.genre}
                onChange={handleChange}
                required
                fullWidth
                disabled={!isLoggedIn}
              >
                {genres.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="releaseDate"
                label="Release Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.releaseDate}
                onChange={handleChange}
                required
                fullWidth
                disabled={!isLoggedIn}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="runtime"
                label="Runtime (minutes)"
                type="number"
                value={formData.runtime}
                onChange={handleChange}
                required
                fullWidth
                disabled={!isLoggedIn}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="productionCompanies"
                label="Production Company(s)"
                value={formData.productionCompanies}
                onChange={handleChange}
                required
                helperText="Separate multiple companies with commas"
                fullWidth
                disabled={!isLoggedIn}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={!isLoggedIn}
              >
                Submit Fantasy Movie
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
           Movie submitted successfully!
        </Alert>
      </Snackbar>
    </div>
    
  );
};

export default FantasyMoviePage;
