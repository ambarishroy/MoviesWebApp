import React from "react";
import PageTemplate from "../components/templateMovieListPage";

const FavouriteMoviesPage: React.FC= () => {
    const toDo = () => true;
    // Get movies from local storage.
    const movies = JSON.parse(localStorage.getItem("favourites") || '[]');
  
    return (
      <PageTemplate
        title="Favourite Movies"
        movies={movies}
        selectFavourite={toDo}
      />
    );
}

export default FavouriteMoviesPage
