import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Box,
} from "@mui/material";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Fantasy Movie Created:", formData); // Replace with backend submission if needed
    alert("Fantasy movie submitted successfully!");
    setFormData({
      title: "",
      overview: "",
      genre: "",
      releaseDate: "",
      runtime: "",
      productionCompanies: "",
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Your Fantasy Movie
      </Typography>
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
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit Fantasy Movie
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FantasyMoviePage;
