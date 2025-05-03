import React from "react";
import { Box, Button, Typography } from "@mui/material";

const WatchOptions: React.FC = () => {
  return (
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      <Button
        variant="outlined"
        href="https://www.netflix.com"
        target="_blank"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          width={24}
        />
      </Button>

      <Button
        variant="outlined"
        href="https://www.primevideo.com"
        target="_blank"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"
          alt="Prime Video"
          width={24}
        />
      </Button>
    </Box>
  );
};

export default WatchOptions;
