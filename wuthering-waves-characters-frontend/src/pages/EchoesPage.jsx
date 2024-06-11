import Header from "../components/UI/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchEchoes } from "../api/http";
import constants from "../constants/constants";
import Pager from "../components/UI/Pager";
import { useState } from "react";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import EchoesCard from "../components/Echoes/EchoesCard";
import SearchBar from "../components/UI/SearchBar";

export default function EchoesPage() {
  const echoesPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["echoes"],
    queryFn: fetchEchoes,
    staleTime: constants.STALE_TIME,
  });

  const indexOfLastEcho = currentPage * echoesPerPage;
  const indexOfFirstEcho = indexOfLastEcho - echoesPerPage;

  let currentEchoes = [];
  let totalPages = 0;

  if (data) {
    currentEchoes = data.echoes.filter((echo) =>
      echo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    totalPages = Math.ceil(currentEchoes.length / echoesPerPage);

    currentEchoes = currentEchoes.slice(indexOfFirstEcho, indexOfLastEcho);
  }

  function handleSearch(searchTerm) {
    setSearchQuery(searchTerm);
    setCurrentPage(1); // Reset to first page
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div
        className="flex flex-col items-center justify-center m-5"
        data-testid="characters-page"
      >
        <h1
          className="text-3xl font-bold text-center mt-5"
          data-testid="characters-title"
        >
          All Echoes
        </h1>
        <SearchBar handleSearch={handleSearch} title={"Search Echoes"} />
      </div>
      {isLoading && (
        <LoadingIndicator
          text="Loading echoes..."
          containerClassName="flex flex-col items-center justify-center m-5"
          className="m-5"
          width={50}
          height={50}
          color="gray"
        />
      )}
      {isError && (
        <ErrorIndicator
          title="An error occurred"
          message={error?.message || "Failed to fetch echoes."}
        />
      )}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-16 g-5">
          {currentEchoes.map((echo, index) => (
            <EchoesCard key={echo} echo={echo} delay={index * 0.1} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-5">
        <Pager
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
}
