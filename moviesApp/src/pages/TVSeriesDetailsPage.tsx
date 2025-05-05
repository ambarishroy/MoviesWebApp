import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getTVSeries } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import TVSeriesDetails from "../components/tvSeriesDetails";
import Header from "../components/headerMovieList";

const TVSeriesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: series, isLoading, error } = useQuery(
    ["tvseries", id],
    () => getTVSeries(id!)
  );

  if (isLoading) return <Spinner />;
  if (error || !series) return <p>Something went wrong fetching the series.</p>;

  const mappedSeries = {
    ...series,
    title: series.name || "Untitled Series",
    release_date: series.first_air_date || "Unknown",
  };

  return (
    <div>
        <Header title={`TV SERIES: ${series.name}`} />
        <TVSeriesDetails {...mappedSeries} />
    </div>);
};

export default TVSeriesDetailsPage;
