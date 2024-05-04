import Cookies from "js-cookie";
import { Movie } from "@/app/types/types";

// Cookie name for storing favorite movies
const COOKIE_KEY = "favorite_movies";

/**
 * Add a movie to cookies as a favorite
 *
 * @param {Movie} data - Movie to be added
 */
export const addFavoriteToCookie = (data: Movie) => {
  const existingFavorites = Cookies.get(COOKIE_KEY); // Get the existing favorites from cookies
  const favorites: Movie[] = existingFavorites
    ? JSON.parse(existingFavorites)
    : [];

  // Check if the movie is already a favorite
  const isAlreadyFavorite = favorites.some(
    (item) => item.imdbID === data.imdbID
  );

  if (!isAlreadyFavorite) {
    favorites.push(data); // Add to favorites
    Cookies.set(COOKIE_KEY, JSON.stringify(favorites), { expires: 365 }); // Set cookie with 1-year expiry
  }
};

/**
 * Remove a movie from cookies if it's a favorite
 *
 * @param {string} imdbID - IMDb ID of the movie to be removed
 */
export const removeFavoriteFromCookie = (imdbID: string) => {
  const existingFavorites = Cookies.get(COOKIE_KEY);
  const favorites: Movie[] = existingFavorites
    ? JSON.parse(existingFavorites)
    : [];

  // Filter out the movie to be removed
  const updatedFavorites = favorites.filter((item) => item.imdbID !== imdbID);

  Cookies.set(COOKIE_KEY, JSON.stringify(updatedFavorites), { expires: 365 }); // Update cookie with new favorites list
};

/**
 * Check if a movie is a favorite in cookies
 *
 * @param {string} imdbID - IMDb ID of the movie to check
 * @returns {boolean} - Whether the movie is in the favorites list
 */
export const isFavoriteInCookie = (imdbID: string): boolean => {
  const existingFavorites = Cookies.get(COOKIE_KEY); // Get existing favorites from cookies
  const favorites: Movie[] = existingFavorites
    ? JSON.parse(existingFavorites)
    : [];

  return favorites.some((item) => item.imdbID === imdbID); // Check if the movie is in favorites
};
