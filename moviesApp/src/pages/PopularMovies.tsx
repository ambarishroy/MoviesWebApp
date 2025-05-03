import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../api/tmdb-api";
import { Grid } from "@mui/material";
import MovieCard from "../components/movieCard";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import Header from "../components/headerMovieList";
import useFiltering from "../hooks/useFiltering";
import PaginationControl from "../components/Pagination/PaginationControl";

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const sortFiltering = {
    name: "sort",
    value: "",
    condition: () => true,
  };

  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
    sortFiltering,
  ]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
      }
    };
    fetchMovies();
  }, [page]);

  let displayedMovies = filterFunction(movies);
  const sortOption = filterValues[2].value;

  if (sortOption === "title") {
    displayedMovies = [...displayedMovies].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "rating") {
    displayedMovies = [...displayedMovies].sort((a, b) => b.vote_average - a.vote_average);
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map((f) =>
      f.name === type ? changedFilter : f
    );
    setFilterValues(updatedFilterSet);
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <Header title="Popular Movies" />

      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />

      <Grid container spacing={5}>
        {displayedMovies.map((movie: BaseMovieProps) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
            <MovieCard
              movie={movie}
              action={() => <AddToFavouritesIcon {...movie} />}
            />
          </Grid>
        ))}
      </Grid>

      <PaginationControl
        totalItems={totalPages * 20}
        itemsPerPage={20}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PopularMovies;
