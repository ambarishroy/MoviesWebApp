import React, {useState, useEffect}  from "react"; 
import MovieHeader from "../components/headerMovie/";
import MovieDetails from "../components/movieDetails";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MovieDetailsProps, MovieImage} from "../types/interfaces";
import { useParams } from "react-router-dom";
import { getMovie, getMovieImages } from "../api/tmdb-api";

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

const MoviePage: React.FC= () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsProps>();
  const [images, setImages] = useState<MovieImage[]>([]);

  useEffect(() => {
    getMovie(id ?? "").then((movie) => {
      setMovie(movie);
    });
  }, [id]);

  useEffect(() => {
    getMovieImages(id ?? "").then((images) => {
      setImages(images);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
