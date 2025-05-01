import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { MovieDetailsProps } from "../../types/interfaces";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 16px",
    gap: "16px",
    backgroundColor: "#f5f5d5",
    borderBottom: "1px solid #ddd",
  },
};

const MovieHeader: React.FC<MovieDetailsProps> = (movie) => {
  const navigate = useNavigate();

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h6" component="h2" sx={{ margin: "0 auto", textAlign: "center" }}>
            {movie.title}
        </Typography>

      {/* <IconButton aria-label="go forward" onClick={() => navigate(1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton> */}
    </Paper>
  );
};

export default MovieHeader;
