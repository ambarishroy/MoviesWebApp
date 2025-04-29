import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActorMovieCredits } from "../api/tmdb-api";
import { Grid, Typography } from "@mui/material";
import MovieCard from "../components/movieCard"; 
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";

const ActorDetailsPage: React.FC = () => {
  const { actorId } = useParams<{ actorId: string }>();
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        if (actorId) {
          const credits = await getActorMovieCredits(actorId);
          setMovies(credits);
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [actorId]);

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Movies Acted In
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                movie={movie}
                action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No movies found for this actor.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default ActorDetailsPage;
