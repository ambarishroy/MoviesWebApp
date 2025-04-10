import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

const meta = {
    title: "Movie Details Page/MovieDetails",
    component: MovieDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
      ],
} satisfies Meta<typeof MovieDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: SampleMovie
};
Basic.storyName = "Default";