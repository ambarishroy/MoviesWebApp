import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActorDetails, getActorMovieCredits } from "../api/tmdb-api";
import { Typography, Grid } from "@mui/material";
import Spinner from "../components/spinner";
import MovieCard from "../components/movieCard";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";
import Header from "../components/headerMovieList";

const ActorInfoPage: React.FC = () => {
  const { actorId } = useParams<{ actorId: string }>();
  const [actor, setActor] = useState<any>(null);
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const [actorData, movieCredits] = await Promise.all([
          getActorDetails(actorId!),
          getActorMovieCredits(actorId!)
        ]);
        console.log("Actor Data:", actorData);

        setActor(actorData);
        setMovies(
          movieCredits.map((movie: any) => ({
            ...movie,
            release_date: movie.release_date || "Unknown",
          }))
        );
      } catch (error) {
        console.error("Failed to fetch actor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActorData();
  }, [actorId]);

  if (loading || !actor) return <Spinner />;

  return (  
    <div style={{ padding: "2rem" }}>
      <Header title={`Movies Featuring ${actor.name}`} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
            alt={actor.name}
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3">{actor.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {actor.birthday ? `Born: ${actor.birthday}` : "Birthday unknown"}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "1rem" }}>
            {actor.biography || "No biography available."}
          </Typography>
          <Typography variant="subtitle2" style={{ marginTop: "1rem" }}>
            Popularity: {actor.popularity}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h4" style={{ marginTop: "3rem" }}>
        Movies Featuring {actor.name}
      </Typography>
      <Grid container spacing={4} style={{ marginTop: "1rem" }}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard
              movie={movie}
              action={(m) => <AddToFavouritesIcon {...m} />}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ActorInfoPage;
