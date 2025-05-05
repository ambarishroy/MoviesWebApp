export const getMovies = async ({ year, certification }: { year: string, certification: string }) => {
  const url = new URL(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}`);
  //url.searchParams.append("api_key", import.meta.env.VITE_TMDB_KEY);
  url.searchParams.append("language", "en-US");
  url.searchParams.append("page", "1");

  if (year) {
    url.searchParams.append("primary_release_year", year);
  }

  if (certification) {
    url.searchParams.append("certification_country", "US");
    url.searchParams.append("certification", certification);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
};



  
export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  
  export const getMovieImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };
  
  export const getMovieReviews = (id: string | number) => { //movie id can be string or number
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };
  export const getPopularMovies = (page: number = 1) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    )
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to fetch popular movies. Status: ${response.status}`);
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };
  export const getPopularActors = (page: number = 1) => {
    return fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    )
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to fetch actors. Status: ${response.status}`);
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };
  export const getActorMovieCredits = (actorId: number | string) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    )
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to fetch actor credits. Status: ${response.status}`);
        return response.json();
      })
      .then((json) => json.cast)
      .catch((error) => {
        throw error;
      });
  };
  export const getPopularTVSeries = (page: number = 1) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    )
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to fetch TV series. Status: ${response.status}`);
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };
  export const getTVSeries = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    )
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to get TV Series data. Status: ${response.status}`);
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };
  export const getActorDetails = (actorId: string) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    ).then((res) => {
      if (!res.ok) throw new Error(`Actor not found (status ${res.status})`);
      return res.json();
    });
  };
  
    
  
  
  
