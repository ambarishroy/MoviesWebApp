import type { Meta, StoryObj } from '@storybook/react';
import MovieListHeader from "../components/headerMovieList";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import React from 'react';

const meta = {
    title: 'Home Page/Header',
    component: MovieListHeader,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
    ],
  } satisfies Meta<typeof MovieListHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ title:'Discover Movies'}

};
Basic.storyName = "Default";

