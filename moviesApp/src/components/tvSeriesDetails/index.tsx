import React, { useState } from "react";
import { Typography, Paper, Chip, Drawer, Fab } from "@mui/material";
import { BaseMovieProps } from "../../types/interfaces";


const styles = {
  chipSet: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
    padding: 1.5,
  },
  fab: {
    position: "fixed",
    top: 50,
    right: 2,
  },
};

const TVSeriesDetails: React.FC<BaseMovieProps> = (series) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5">Overview</Typography>
      <Typography variant="body1">{series.overview}</Typography>

      <Paper sx={styles.chipSet}>
        <Chip label={`First Air Date: ${series.release_date}`} />
        <Chip label={`Rating: ${series.vote_average}`} />
      </Paper>


    </>
  );
};

export default TVSeriesDetails;
