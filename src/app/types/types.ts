export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OMDBResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export type MovieType = "movie" | "series" | "episode";

export interface MoviesPageProps {
  movies: Movie[];
}
export interface QueryParams {
  search: string;
  type: string;
  year: number;
  page: number;
}
