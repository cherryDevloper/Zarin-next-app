import { OMDBTitleResult } from "@/app/types/omdb";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getOMDbMediaDetails(imdbId: string) {
  const response = await fetch(
    `http://www.omdbapi.com/?apiKey=${process.env.OMDB_API_KEY}&i=${imdbId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.error(`Error ${error}`);
    });

  return response;
}

export default async function Page({ params }: { params: { imdbID: string } }) {
  const { imdbID } = params;
  const data: OMDBTitleResult = await getOMDbMediaDetails(imdbID);
  if (data?.Error) {
    return notFound();
  }
  const {
    Title,
    Poster,
    Year,
    Type,
    Plot,
    Genre,
    Rated,
    Director,
    Writer,
    Actors,
    Released,
    Runtime,
    BoxOffice,
    Metascore,
  } = data;

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Poster && (
          <Image
            className="object-contain rounded-lg max-w-full h-full max-h-full"
            src={data?.Poster}
            alt={`poster`}
            width={1920}
            height={1080}
            priority
          />
        )}

        <div>
          <div className="flex flex-col gap-2">
            <span>{Title}</span>
            <span>{Year}</span>
            <span>{Genre}</span>
            <div className="w-fit">{Type}</div>
          </div>

          <span className="mt-4">Plot</span>
          <span>{Plot}</span>

          <span className="mt-4">About</span>
          <ul className="leading-7 [&:not(:first-child)]:mt-6">
            <li>Director: {Director}</li>
            <li>Writer: {Writer}</li>
            <li>Actors: {Actors}</li>
            <li>Released: {Released}</li>
            <li>Runtime: {Runtime}</li>
            <li>Rated: {Rated}</li>
            <li>Metascore: {Metascore}</li>
            <li>Box Office: {BoxOffice}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
