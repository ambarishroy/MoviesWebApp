import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";


interface MovieContextInterface {
    favourites: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);  // NEW
    favouriteTVSeries: number[];
    addToFavouriteTVSeries: (series: BaseMovieProps) => void;
    removeFromFavouriteTVSeries: (id: number) => void;
    clearFavourites: () => void;
    clearFavouriteTVSeries: () => void;
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (movie, review) => { movie.id, review},  // NEW
    favouriteTVSeries: [],
    addToFavouriteTVSeries: () => {},
    removeFromFavouriteTVSeries: () => {},
    clearFavourites: () => {},
clearFavouriteTVSeries: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

    const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
        const [favouriteTVSeries, setFavouriteTVSeries] = useState<number[]>(
            () => JSON.parse(localStorage.getItem("favouriteTVSeries") || "[]")
          );
    const addToFavouriteTVSeries = (series: BaseMovieProps) => {
        setFavouriteTVSeries([...favouriteTVSeries, series.id]);
    };
    const [favourites, setFavourites] = useState<number[]>(
        () => JSON.parse(localStorage.getItem("favourites") || "[]")
      );
      useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
      }, [favourites]);
      
      useEffect(() => {
        localStorage.setItem("favouriteTVSeries", JSON.stringify(favouriteTVSeries));
      }, [favouriteTVSeries]);
      
    const [myReviews, setMyReviews] = useState<Review[]>( [] ) 
    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);
    const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
      };
    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);
    const removeFromFavouriteTVSeries = (id: number) => {
        setFavouriteTVSeries(favouriteTVSeries.filter((seriesId) => seriesId !== id));
      };
      const clearFavourites = () => {
        setFavourites([]);
      };
      
      const clearFavouriteTVSeries = () => {
        setFavouriteTVSeries([]);
      };

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                favouriteTVSeries,         
                addToFavouriteTVSeries,
                removeFromFavouriteTVSeries,
                clearFavourites,
                clearFavouriteTVSeries,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
