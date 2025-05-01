import React, { useEffect, useState } from "react";
import { getPopularTVSeries } from "../api/tmdb-api";
import { Grid, Typography } from "@mui/material";
import MovieCard from "../components/movieCard"; 
import { BaseMovieProps } from "../types/interfaces";
import AddToFavouriteTVSeriesIcon from "../components/cardIcons/addToFavouriteTVSeries";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import useFiltering from "../hooks/useFiltering";
import Header from "../components/headerMovieList";

const tvSeriesPage: React.FC = () => {
  const [tvSeries, setTvSeries] = useState<BaseMovieProps[]>([]);
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
  
  const changeFilterValues = (type: string, value: string) => {
    const updated = filterValues.map((f) =>
      f.name === type ? { ...f, value } : f
    );
    setFilterValues(updated);
  };
   
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPopularTVSeries(page);
        const mappedTvSeries = data.results.map((series: any) => ({
          ...series,
          release_date: series.first_air_date || "Unknown",
          title: series.name || "Untitled Series",
        }));
        
        setTvSeries(mappedTvSeries);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [page]);
  let displayedSeries = filterFunction(tvSeries); 
  const sortOption = filterValues[2].value;
  if (sortOption === "title") {
    displayedSeries = [...displayedSeries].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "rating") {
    displayedSeries = [...displayedSeries].sort((a, b) => b.vote_average - a.vote_average);
  }
  console.log("Filtered TV series:", displayedSeries);

  return (
    <div>
     <Header title="TV Series" />
      <MovieFilterUI
  onFilterValuesChange={changeFilterValues}
  titleFilter={filterValues[0].value}
  genreFilter={filterValues[1].value}
/>

      <Grid container spacing={4} justifyContent="center">
      {displayedSeries.length > 0 ? (
  displayedSeries.map((series: BaseMovieProps) => (
            <Grid key={series.id} item xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                movie={series}
                action={(series) => <AddToFavouriteTVSeriesIcon series={series} />}
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
