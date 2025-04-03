import React, {useState, useEffect}  from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { MovieDetailsProps} from "../types/interfaces";
import { getMovie} from "../api/tmdb-api";
import PageTemplate from "../components/templateMoviePage";


const MovieDetailsPage: React.FC= () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsProps>();

  useEffect(() => {
    getMovie(id ?? "").then((movie) => {
      setMovie(movie);
    });
  }, [id]);

  return (
    <>
      {movie ? (
        <>
        <PageTemplate movie={movie}>
          <MovieDetails {...movie} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default MovieDetailsPage;
