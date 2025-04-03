import { useEffect, useState } from "react";
import { getMovie } from '../api/tmdb-api'
import { MovieDetailsProps } from '../types/interfaces'

type MovieHookReturnType = [MovieDetailsProps | undefined, React.Dispatch<React.SetStateAction<MovieDetailsProps | undefined>>];

const useMovie  = (id: string):MovieHookReturnType  => {
    const [movie, setMovie] = useState<MovieDetailsProps>();
    useEffect(() => {
        getMovie(id).then(movie => {
            setMovie(movie);
        });
    }, [id]);
    return [movie, setMovie];
};

export default useMovie
