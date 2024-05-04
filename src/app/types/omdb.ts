export interface OMDBTitleRequest {
  /** A valid IMDb ID
   * @example tt1285016
   */
  i?: string;
  /** Movie title to search for. */
  t?: string;
  /** 	Type of result to return.*/
  type?: "movie" | "series" | "episode";
  /** Year of release.*/
  y?: number;
  /**
   * Return short or full plot.
   * @default short
   */
  plot?: "short" | "full";
  /**
   * The data type to return.
   * @default json
   */
  r?: "json" | "xml";
  /** JSONP callback name. */
  callback?: string;
}

interface Ratings {
  Source: string;
  Value: string;
}

export interface OMDBTitleResult {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Ratings[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error: string;
}

export interface OMDBSearchRequest {
  /** Movie title to search for. */
  s: string;
  /** 	Type of result to return.*/
  type?: "movie" | "series" | "episode";
  /** Year of release.*/
  y?: string;
  /**
   * The data type to return.
   * @default json
   */
  r?: "json" | "xml";
  /**
   * Page number to return.
   * @default 1
   */
  page?: string;
  /** JSONP callback name. */
  callback?: string;
}

export interface OMDBSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
}
