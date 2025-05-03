import React, { useContext } from "react";
import { Button } from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";

interface ClearFavouritesButtonProps {
  type: "movies" | "tvseries";
}

const ClearFavouritesButton: React.FC<ClearFavouritesButtonProps> = ({ type }) => {
  const {
    clearFavourites,
    clearFavouriteTVSeries,
    favourites,
    favouriteTVSeries,
  } = useContext(MoviesContext);

  const handleClear = () => {
    if (type === "movies" && favourites.length > 0) {
      clearFavourites();
    } else if (type === "tvseries" && favouriteTVSeries.length > 0) {
      clearFavouriteTVSeries();
    }
  };

  const shouldDisable = type === "movies" ? favourites.length === 0 : favouriteTVSeries.length === 0;

  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleClear}
      disabled={shouldDisable}
      sx={{  position: "fixed",
        top: 90,
        right: 120,
        zIndex: 1000, }}
    >
      Clear All Favourite {type === "movies" ? "Movie" : "TV Series"}?
    </Button>
  );
};

export default ClearFavouritesButton;
