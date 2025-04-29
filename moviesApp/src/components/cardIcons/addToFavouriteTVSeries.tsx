import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseMovieProps } from "../../types/interfaces";

interface Props {
    series: BaseMovieProps;
  }
  
  const AddToFavouriteTVSeriesIcon: React.FC<Props> = ({ series }) => {
    const context = useContext(MoviesContext);
  
    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log("Adding to Favorite TV Series:", series);
      context.addToFavouriteTVSeries(series);
    };
  
    return (
      <IconButton aria-label="add to favorites" onClick={onUserSelect}>
        <FavoriteIcon color="primary" fontSize="large" />
      </IconButton>
    );
  };
  
  export default AddToFavouriteTVSeriesIcon;
  
