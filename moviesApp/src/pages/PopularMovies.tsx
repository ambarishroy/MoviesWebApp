import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../api/tmdb-api";
import { Grid } from "@mui/material";
import MovieCard from "../components/movieCard"; 
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";
import FilterMoviesCard from "../components/filterMoviesCard";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";

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
  let displayedMovies = filterFunction(movies);
  const sortOption = filterValues[2].value;
if (sortOption === "title") {
  displayedMovies = [...displayedMovies].sort((a, b) => a.title.localeCompare(b.title));
} else if (sortOption === "rating") {
  displayedMovies = [...displayedMovies].sort((a, b) => b.vote_average - a.vote_average);
}

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPopularMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [page]);
  
  

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map((f) =>
      f.name === type ? changedFilter : f
    );
    setFilterValues(updatedFilterSet);
  };
  
  
  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieFilterUI
  onFilterValuesChange={changeFilterValues}
  titleFilter={filterValues[0].value}
  genreFilter={filterValues[1].value}
/>
     

      <Grid container spacing={5}>
      {displayedMovies.map((movie : BaseMovieProps) => (
        <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
          <MovieCard
            movie={movie}
            action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
          />
         </Grid>
    ))}

        
      </Grid>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularMovies;
