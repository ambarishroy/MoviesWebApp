import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import Header from "../components/headerMovieList";
import WatchOptions from "../components/cardIcons/WatchOptions";
import PaginationControl from "../components/Pagination/PaginationControl";
import ClearFavouritesButton from "../components/cardIcons/ClearFavouritesButton";
import { Box } from "@mui/material";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId.toString()),
    }))
  );

  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);
  if (isLoading) return <Spinner />;
  if (movieIds.length === 0) {
    return <h2>No Favorite Movies yet!</h2>;
  }
  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const filteredMovies = allFavourites ? filterFunction(allFavourites) : [];

  const displayedMovies = filteredMovies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
    <ClearFavouritesButton type="movies" />
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => (
          <>
            <WatchOptions />
            <RemoveFromFavourites {...movie} />
            <WriteReview {...movie} />
          </>
        )}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <PaginationControl
        totalItems={filteredMovies.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default FavouriteMoviesPage;
