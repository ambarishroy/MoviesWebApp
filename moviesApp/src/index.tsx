import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PopularMovies from './pages/PopularMovies'
import ActorsPage from "./pages/actorsPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import TvSeriesPage from "./pages/tvSeriesPage";
import FavouriteTVSeriesPage from "./pages/FavouriteTVSeriesPage";
import ActorInfoPage from "./pages/ActorInfoPage";
import FantasyMoviePage from "./pages/FantasyMoviePage";
import SignInPage from "./pages/SignInPage";
import TVSeriesReviewForm from "./components/tvseriesReviewform";
import TVSeriesDetailsPage from "./pages/TVSeriesDetailsPage";
import MyReviewsPage from "./pages/MyReviewsPage";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader />
      <MoviesContextProvider>
      <Routes>
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        <Route path="/movies/popular" element={<PopularMovies />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/actors/:actorId" element={<ActorDetailsPage />} />
        <Route path="/tvseries" element={<TvSeriesPage />} />
        <Route path="/tvseries/favourites" element={<FavouriteTVSeriesPage />} />
        <Route path="/actors/:actorId/info" element={<ActorInfoPage />} />
        <Route path="/fantasy-movie" element={<FantasyMoviePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/tvseries/:id/review" element={<TVSeriesReviewForm />} />
        <Route path="/tvseries/:id" element={<TVSeriesDetailsPage />} />
        <Route path="/my-reviews" element={<MyReviewsPage />} />


      </Routes>
      </MoviesContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

