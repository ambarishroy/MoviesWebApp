import React, { useState, useEffect } from "react";  // Changed
import Header from "../components/headerMovieList";
import FilterCard from "../components/filterMoviesCard";
import Grid from "@mui/material/Grid";
import MovieList from "../components/movieList";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { FilterOption, BaseMovieProps} from "../types/interfaces";

 
const styles = {
  root: {
    padding: "20px",
  }, fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

  const MovieListPage: React.FC= () => {
    const [movies, setMovies] = useState<BaseMovieProps[]>([]);
    const [titleFilter, setTitleFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const genreId = Number(genreFilter);

    let displayedMovies = movies
    .filter((m: BaseMovieProps) => {
      return m.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m: BaseMovieProps) => {
      return genreId > 0 ? m.genre_ids?.includes(genreId) : true;
    });

    const handleChange = (type: FilterOption, value: string) => {
      if (type === "title") setTitleFilter(value);
      else setGenreFilter(value);
    };

    useEffect(() => {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
      )
        .then((res) => res.json())
        .then((json) => {
          // console.log(json);
          return json.results;
        })
        .then((movies) => {
          setMovies(movies);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
      <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={"Home Page"} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList movies={displayedMovies}></MovieList>
        </Grid>
      </Grid>
      <Fab
          color="secondary"
          variant="extended"
          onClick={() => setDrawerOpen(true)}
          sx={styles.fab}
        >
          Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
        />
      </Drawer>
    </>
  );
};
export default MovieListPage;
