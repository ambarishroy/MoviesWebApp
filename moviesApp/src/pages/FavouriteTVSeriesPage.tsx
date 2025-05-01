import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getTVSeries } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromFavouritesTVSeries from "../components/cardIcons/RemoveFromFavouritesTVSeries";
import Header from "../components/headerMovieList";
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

const FavouriteTVSeriesPage: React.FC = () => {
  const { favouriteTVSeries: seriesIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  const favouriteTVSeriesQueries = useQueries(
    seriesIds.map((seriesId) => {
      return {
        queryKey: ["tvseries", seriesId],
        queryFn: () => getTVSeries(seriesId.toString()),
      };
    })
  );

  const isLoading = favouriteTVSeriesQueries.find((s) => s.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  if (seriesIds.length === 0) {
    return <h2>No Favorite TV Series yet!</h2>;
  }
  const allFavourites = favouriteTVSeriesQueries
  .filter((q) => q.isSuccess && q.data)
  .map((q) => ({
    ...q.data,
    title: q.data.name || "Unknown",
    release_date: q.data.first_air_date || "Unknown",
  }));
  console.log("Mapped Favourites:", allFavourites);

  const displayedSeries = filterFunction(allFavourites);
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const toDo = () => true;
<Header title="Favourite TV Series" />
  return (
    <>
      <PageTemplate
        title="Favourite TV Series"
        movies={displayedSeries}
        action={(series) => {
          return (
            <>
              <RemoveFromFavouritesTVSeries {...series} />
            </>
          );
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteTVSeriesPage;
