import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const styles = {
    title: {
      flexGrow: 1,
    },
  };

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Actors", path: "/actors" },
    { label: "TV Series", path: "/tvseries" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);
  const accountMenuOpen = Boolean(accountAnchorEl);
  
  return (
    <>
      <AppBar position="fixed"  elevation={1}
          sx={{
            backgroundColor: "#0D47A1",
            fontFamily: "'Inter', 'Roboto', sans-serif",
          }}>
        <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            fontFamily: "'Inter', 'Roboto', sans-serif",
            letterSpacing: "1px",
          }}
        >
          THE MOVIE LOG
        </Typography>

          {/* <Typography variant="h6" sx={styles.title}>
            Welcome
          </Typography> */}
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>          
          ) : (
            <>
          <>
              <Button color="inherit" onClick={() => navigate("/")} >
                Home
              </Button>
              <Button color="inherit" onClick={() => navigate("/movies/popular")}>
                Popular movies
              </Button>
              <Button color="inherit" onClick={() => navigate("/actors")}>
                Actors
              </Button>
              <Button color="inherit" onClick={() => navigate("/fantasy-movie")}>
                Fantasy Movie
              </Button>
              <Button color="inherit" onClick={() => navigate("/tvseries")}>
                TV Series
              </Button>
              <Button color="inherit" onClick={() => navigate("/my-reviews")}>
                My Reviews
              </Button>
              <Button
              color="inherit"
              onClick={handleMenu}
            >
            Favorites
          </Button>
            <Menu
              id="favorites-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={() => { handleMenuSelect("/movies/favourites"); setAnchorEl(null); }}>
                Favorite Movies
              </MenuItem>
              <MenuItem onClick={() => { handleMenuSelect("/tvseries/favourites"); setAnchorEl(null); }}>
                Favorite TV Series
              </MenuItem>
            </Menu>
            </>

            </>
          )}
          <IconButton
            color="inherit"
            aria-label="account menu"
            onClick={(event) => setAccountAnchorEl(event.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>

        </Toolbar>
          <Menu
            id="account-menu"
            anchorEl={accountAnchorEl}
            open={accountMenuOpen}
            onClose={() => setAccountAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => {
              setAccountAnchorEl(null);
              navigate("/signin");
            }}>
              Sign In
            </MenuItem>
            <MenuItem onClick={() => {
              setAccountAnchorEl(null);
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              localStorage.removeItem("awsCredentials");
              navigate("/");
              alert("Logged out!");
            }}>
              Logout
            </MenuItem>
          </Menu>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
