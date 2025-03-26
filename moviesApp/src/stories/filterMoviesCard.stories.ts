import type { Meta, StoryObj } from '@storybook/react';
import FilterMoviesCard from "../components/filterMoviesCard";

const meta = {
  title: 'Home Page/FilterMoviesCard',
  component: FilterMoviesCard,
} satisfies Meta<typeof FilterMoviesCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
};
Basic.storyName = "Default";

