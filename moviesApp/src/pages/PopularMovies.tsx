import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../api/tmdb-api";
import { Grid } from "@mui/material";
import MovieCard from "../components/movieCard"; 
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  return (
    <div>
      <h1>Popular Movies</h1>

      <Grid container spacing={5}>
        {movies.map((movie) => (
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
