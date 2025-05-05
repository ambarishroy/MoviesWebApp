import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import {  MovieListPageTemplateProps} from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#ffffff",
    padding: "8px 8px",            
    minHeight: "100vh",     
  }
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({ movies, title, action, isTVSeries = false, })=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12} sx={{ marginBottom: "16px" }}>
      <Header title={title} />
    </Grid>

      <Grid item container spacing={5}>
      <MovieList action={action} movies={movies} isTVSeries={isTVSeries} />
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
