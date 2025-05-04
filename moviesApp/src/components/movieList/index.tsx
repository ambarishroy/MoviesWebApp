import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps } from "../../types/interfaces";

const MovieList: React.FC<BaseMovieListProps> = ({movies, action, isTVSeries = false}) => {
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={3}>
         <Movie key={m.id} movie={m} action={action} isTVSeries={isTVSeries}/>
    </Grid>
  ));
  return movieCards;
}

export default MovieList;
