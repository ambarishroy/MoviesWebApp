import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";


interface MovieContextInterface {
    favourites: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);  // NEW
    favouriteTVSeries: number[];
    addToFavouriteTVSeries: (series: BaseMovieProps) => void;
    removeFromFavouriteTVSeries: (id: number) => void;
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (movie, review) => { movie.id, review},  // NEW
    favouriteTVSeries: [],
    addToFavouriteTVSeries: () => {},
    removeFromFavouriteTVSeries: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

    const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favouriteTVSeries, setFavouriteTVSeries] = useState<number[]>([]);
    const addToFavouriteTVSeries = (series: BaseMovieProps) => {
        setFavouriteTVSeries([...favouriteTVSeries, series.id]);
    };
    const [favourites, setFavourites] = useState<number[]>([]);
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
      

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                favouriteTVSeries,         
                addToFavouriteTVSeries,
                removeFromFavouriteTVSeries
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
