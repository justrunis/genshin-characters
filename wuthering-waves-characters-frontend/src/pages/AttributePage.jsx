import Header from "../components/UI/Header";
import { useParams } from "react-router-dom";
import { fetchAttribute } from "../api/http";
import { useQuery } from "@tanstack/react-query";
import constants from "../constants/constants";
import CharacterCard from "../components/Characters/CharacterCard";

export default function AttributePage() {
  const { attribute } = useParams();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["attribute", { attribute }],
    queryFn: () => fetchAttribute({ attribute }),
    staleTime: constants.STALE_TIME,
  });

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <h1
        className="text-3xl font-bold text-center mt-5"
        data-testid="attribute-title"
      >
        {attribute} characters
      </h1>
      <div className="flex flex-col items-center justify-center p-6">
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
            {data.characters.map((character) => (
              <CharacterCard key={character.name} character={character.name} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}