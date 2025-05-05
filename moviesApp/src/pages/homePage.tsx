import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { TextField, Grid, Button } from "@mui/material";
import PaginationControl from "../components/Pagination/PaginationControl";

const HomePage: React.FC = () => {
  const [year, setYear] = useState("");
  const [certification, setCertification] = useState("");
  const [searchParams, setSearchParams] = useState({ year: "", certification: "" });
  const [shouldFetch, setShouldFetch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, error, isLoading, isError, refetch } = useQuery<DiscoverMovies, Error>(
    ["discover", searchParams],
    () => getMovies(searchParams),
    { enabled: !!searchParams.year || !!searchParams.certification }
  );
  
  useEffect(() => {
    if (shouldFetch) {
      refetch();
    }
  }, [searchParams, shouldFetch, refetch]);

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

  const handleSearch = () => {
    setSearchParams({ year, certification });
    // setShouldFetch(true);
    console.log(data)
    console.log(searchParams);
  };

  const changeFilterValues = (type: string, value: string) => {
    const updated = filterValues.map((f) =>
      f.name === type ? { ...f, value } : f
    );
    setFilterValues(updated);
  };
const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results ?? [];
  let displayedMovies = filterFunction(movies);

  const sortOption = filterValues.find(f => f.name === "sort")?.value;
  if (sortOption === "title") {
    displayedMovies.sort((a: BaseMovieProps, b: BaseMovieProps) =>
      a.title.localeCompare(b.title)
    );
    
  } else if (sortOption === "rating") {
    displayedMovies.sort((a: BaseMovieProps, b: BaseMovieProps) =>
      b.vote_average - a.vote_average
    );
    
  }

  return (
    <>
      <Grid container spacing={2} sx={{ px: 3, pt: 2 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Release Year"
            type="number"
            fullWidth
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Certification"
            fullWidth
            value={certification}
            onChange={(e) => setCertification(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" fullWidth onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>

      <PageTemplate
        title="Search your movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
      />

      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <PaginationControl
              totalItems={totalPages * 20}
              itemsPerPage={20}
              currentPage={page}
              onPageChange={handlePageChange}
            />
    </>
  );
};

export default HomePage;
