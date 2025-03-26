import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";

const meta = {
  title: "Movie Details Page/MovieDetails",
  component: MovieDetails,
} satisfies Meta<typeof MovieDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args:  SampleMovie
};
Basic.storyName = "Default";
