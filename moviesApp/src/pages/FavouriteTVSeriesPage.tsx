import React, { useContext, useState } from "react";
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
import WatchOptions from "../components/cardIcons/WatchOptions";
import WriteTVSeriesReview from "../components/cardIcons/writeTVSeriesReview";
import PaginationControl from "../components/Pagination/PaginationControl";
import ClearFavouritesButton from "../components/cardIcons/ClearFavouritesButton";

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
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  const favouriteTVSeriesQueries = useQueries(
    seriesIds.map((seriesId) => ({
      queryKey: ["tvseries", seriesId],
      queryFn: () => getTVSeries(seriesId.toString()),
    }))
  );

  const isLoading = favouriteTVSeriesQueries.some((q) => q.isLoading);

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

  const filteredSeries = filterFunction(allFavourites);

  const startIdx = (page - 1) * itemsPerPage;
  const displayedSeries = filteredSeries.slice(startIdx, startIdx + itemsPerPage);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
    <ClearFavouritesButton type="tvseries" />
      <PageTemplate
        title="Favourite TV Series"
        movies={displayedSeries}
        action={(series) => (
          <>
            <WatchOptions />
            <RemoveFromFavouritesTVSeries {...series} />
            <WriteTVSeriesReview tvSeriesId={series.id} />
          </>
        )}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <PaginationControl
        totalItems={filteredSeries.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default FavouriteTVSeriesPage;
