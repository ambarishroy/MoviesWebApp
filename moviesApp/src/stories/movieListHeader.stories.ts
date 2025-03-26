import type { Meta, StoryObj } from '@storybook/react';
import MovieListHeader from "../components/headerMovieList";

const meta = {
    title: 'Home Page/Header',
    component: MovieListHeader,
  } satisfies Meta<typeof MovieListHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ title:'Discover Movies'}
};

Basic.storyName = "Default";
