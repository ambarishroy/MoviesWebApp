import React, { useEffect, useState } from "react";
import { getPopularActors } from "../api/tmdb-api";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/headerMovieList";
import PaginationControl from "../components/Pagination/PaginationControl";

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

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <Header title="POPULAR ACTORS" />

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
            <Button
              variant="outlined"
              size="small"
              component={Link}
              to={`/actors/${actor.id}/info`}
              style={{ marginTop: "8px" }}
            >
              More Info
            </Button>
          </Grid>
        ))}
      </Grid>

      <PaginationControl
        totalItems={totalPages * 20}
        itemsPerPage={20}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ActorsPage;
