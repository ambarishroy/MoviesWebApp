import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import {  MovieListPageTemplateProps} from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({ movies, title, selectFavourite })=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList
          selectFavourite={selectFavourite}
          movies={movies}
        ></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
