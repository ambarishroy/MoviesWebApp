import React, { useEffect, useState } from "react";
import { getPopularActors } from "../api/tmdb-api";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Actor {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
}

const ActorsPage: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPopularActors(page);
        setActors(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [page]);

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Popular Actors
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {actors.map((actor) => (
          <Grid key={actor.id} item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/actors/${actor.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ textAlign: "center" }}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={actor.name}
                  style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                />
                <Typography variant="h6" style={{ marginTop: "8px" }}>
                  {actor.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {actor.known_for_department}
                </Typography>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ActorsPage;
