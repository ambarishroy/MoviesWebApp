import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 16px",
    gap: "16px",
    backgroundColor: "#f5f5d5",
    borderBottom: "1px solid #ddd",
    marginBottom: "16px",
  },
};

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Paper component="div" sx={styles.root} elevation={1}>
      <IconButton
        aria-label="go back"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

        <Typography variant="h6" component="h2" sx={{ margin: "0 auto", textAlign: "center" }}>
            {title}
        </Typography>
    </Paper>
  );
};

export default Header;
