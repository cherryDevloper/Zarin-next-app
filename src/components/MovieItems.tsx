"use client";
import { Button } from "antd";
import { Movie } from "../app/types/types";
import {
  addFavoriteToCookie,
  isFavoriteInCookie,
  removeFavoriteFromCookie,
} from "@/utils/Cookies";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  movie: Movie;
}

const MovieItems = ({ movie }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isFavoriteInCookie(movie.imdbID));
  }, [movie.imdbID]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteFromCookie(movie.imdbID);
    } else {
      addFavoriteToCookie(movie);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      {" "}
      <div
        key={movie.imdbID}
        className="border p-4 flex flex-col items-center space-y-4"
      >
        <Image
          src={movie.Poster}
          width={300}
          height={400}
          alt={movie.Title}
          className="w-full h-auto min-w-[300px] min-h-[300px]"
        />
        <h3>
          {movie.Title}-<span>{movie.Year}</span>
        </h3>

        <div className="flex space-x-4">
          <Link href={`/movies/${movie.imdbID}`}>View more</Link>
          <Button
            className={!isFavorite ? "bg-gray-100" : "bg-pink-200"}
            onClick={handleToggleFavorite}
          >
            ❤️
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieItems;
