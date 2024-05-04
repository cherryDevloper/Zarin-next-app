import { Badge, Button, Card } from "antd";
import { OMDBSearchRequest, OMDBSearchResult } from "@/app/types/omdb";
import Image from "next/image";
import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";

async function getOMDbMovies(s: string | string[], page: string | string[]) {
  const response = await fetch(
    `http://www.omdbapi.com/?apiKey=${process?.env?.OMDB_API_KEY}&s=${s}&page=${page}`,
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

export default async function Page({
  searchParams,
}: {
  searchParams: OMDBSearchRequest;
}) {
  
  const { s: searchTerm, page: currentPage } = searchParams;
  let data: any;
  if (searchTerm && currentPage) {
    data = await getOMDbMovies(searchTerm, currentPage);
  }
  return (
    <div>
      <span className="md:self-center">
        Search for movies, tv shows, and more!
      </span>

      <SearchForm />

      {data?.Error && (
        <span className="bg-red-200 p-4 rounded-lg opacity-80 md:self-center text-red-900">
          Movie not found!
        </span>
      )}

      {!data && (
        <span className="bg-secondary p-4 rounded-lg opacity-80 md:self-center">
          Start searching! Use the input above.
        </span>
      )}

      {data && !data?.Error && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.Search?.map((result: OMDBSearchResult) => {
            const { imdbID, Title, Year, Type, Poster } = result;

            return (
              <Card className="h-fit max-w-full" key={imdbID}>
                {Poster && (
                  <Image
                    className="object-cover overflow-hidden rounded-t-lg max-w-full h-auto max-h-full"
                    src={Poster}
                    alt={`${Title}'s poster`}
                    width={400}
                    height={400}
                    quality={25}
                    priority
                  />
                )}
                <div>
                  {Title}
                  {Year}
                </div>
                <div>
                  <Badge>{Type}</Badge>
                </div>
                <div>
                  <Button className="w-full">
                    <Link href={`/IMDB/${imdbID}`}>See details</Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </section>
      )}

      {/* {data && !data?.Error && searchTerm && currentPage && (
        <Pagination  currentPage={currentPage} />
      )} */}
    </div>
  );
}
