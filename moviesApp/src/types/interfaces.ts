export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    genre_ids?: number[];
  }
  export interface BaseMovieListProps {
    movies: BaseMovieProps[];
    selectFavourite: (movieId: number) => void;  //add this
  }  
    export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
      id: number;
      name: string;
    }[];
  }
  export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }
  export interface MoviePageProps {
    movie: MovieDetailsProps;
    images: MovieImage[];
  }
  export type FilterOption = "title" | "genre";

  


