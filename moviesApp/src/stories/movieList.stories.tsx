
import type { Meta, StoryObj } from '@storybook/react';
import MovieList from "../components/movieList";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";

import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";


const meta = {
  title: "Home Page/MovieList",
  component: MovieList,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <MoviesContextProvider><Story /></MoviesContextProvider>,
    ],
    
} satisfies Meta<typeof MovieList>;
export default meta;


export const Basic = () => {
  const movies = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <MovieList
        movies={movies}
        action={(movie) => <AddToFavouritesIcon {...movie} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


