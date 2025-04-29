import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { BaseMovieProps } from "../../types/interfaces";

const RemoveFromFavouritesTVSeries: React.FC<BaseMovieProps> = (series) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromFavouriteTVSeries(series.id);
  };

  return (
    <IconButton aria-label="remove from favorites" onClick={onUserSelect}>
      <DeleteIcon color="error" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesTVSeries;
