import React, { useEffect, useState } from "react";
import { getPopularTVSeries } from "../api/tmdb-api";
import { Grid, Typography } from "@mui/material";
import MovieCard from "../components/movieCard"; 
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";

const tvSeriesPage: React.FC = () => {
  const [tvSeries, setTvSeries] = useState<BaseMovieProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPopularTVSeries(page);
        setTvSeries(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [page]);

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Popular TV Series
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {tvSeries.length > 0 ? (
          tvSeries.map((series) => (
            <Grid key={series.id} item xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                movie={series}
                action={(series: BaseMovieProps) => <AddToFavouritesIcon {...series} />}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No TV series found.
          </Typography>
        )}
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

export default tvSeriesPage;
