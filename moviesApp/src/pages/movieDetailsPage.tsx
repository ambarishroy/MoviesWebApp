import React from "react";
import MovieHeader from "../components/headerMovie/";
import MovieDetails from "../components/movieDetails";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MoviePageProps} from "../types/interfaces";

const styles = {
  imageListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTile: { 
    width: "100%",
    height: "auto",
  },

};

const MoviePage: React.FC<MoviePageProps> = ({movie, images}) => {

  return (
    <>
      {movie ? (
        <>
          <MovieHeader {...movie} />
          <Grid container spacing={5} style={{ padding: "15px" }}>
            <Grid item xs={3}>
              <div >
                <ImageList sx={styles.imageListRoot} cols={1}>
                  {images.map((image) => (
                    <ImageListItem
                      key={image.file_path}
                      sx={styles.gridListTile}
                      cols={1}
                    >
                     <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={'Image alternative'}
                      />                    
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </Grid>
            <Grid item xs={9}>
              <MovieDetails {...movie} />
            </Grid>
          </Grid>
        </>
      ) : (
        <h2>Waiting for API data</h2>
      )}
    </>
  );
};

export default MoviePage;
