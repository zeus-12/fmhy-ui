import { Button, Input, Loader, Pagination } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

  const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const fetchSearchResults = async (query, activePage) => {
    console.log(activePage);
    const res = await fetch(
      SERVER_URL + "/api/search?q=" + query + "&page=" + activePage
    );
    const data = await res.json();
    if (!data.status === "ok") {
      setLoading(false);
      setError(true);
      return;
    }
    setSearchResults(data.data);
    setLoading(false);
    setError(false);
  };

  const searchHandler = async (currentPage) => {
    navigate("/search?q=" + query);
    if (!query) return;
    setLoading(true);
    searchRef.current.blur();
    await fetchSearchResults(query, currentPage || activePage);
  };

  const paginationHandler = async (cur) => {
    setActivePage(cur);
    await searchHandler(cur);
    // scroll browser to the top
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-[85vh] flex flex-col">
      <p className="text-3xl font-semibold tracking-tight mb-2">
        <span className="text-cyan-400">FMHY</span> Search
      </p>
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchHandler();
          }
        }}
        ref={searchRef}
        rightSection={
          <svg
            className="w-5 h-5 text-gray-400 hover:cursor-pointer"
            onClick={searchHandler}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-96"
      />

      {error && (
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center w-[50vw] space-y-2">
            <p className="text-7xl text-gray-400 font-semibold">500</p>
            <p className="text-3xl font-semibold">Something went wrong</p>
            <p className="text-gray-600">
              Our servers couldn't handle your request. Try refreshing the page.
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="fill"
              color="cyan"
              className="bg-cyan-400 hover:bg-cyan-300"
            >
              Refresh the page
            </Button>
          </div>
        </div>
      )}

      {!error && loading && (
        <div className="flex-1 flex justify-center items-center">
          <Loader size="lg" variant="bars" />
        </div>
      )}

      {searchResults?.length > 0 && (
        <div className="flex-1 flex flex-col space-y-4 mt-4">
          {searchResults.map((result) => (
            <div
              className="flex flex-col bg-gray-900 space-y-2 p-4 rounded-xl hover:scale-[101%] transition transform duration-100 ease-out"
              // style={{ backdropFilter: "saturate(180%) blur(20px)" }}
              key={result.title}
            >
              <p className="text-xl font-semibold">{result.title}</p>
              {result.link?.map((link) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                  href={link}
                  key={link}
                >
                  {result.starred ? "🌟 " : ""} {link}
                </a>
              ))}
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <Pagination
              page={activePage}
              onChange={(cur) => paginationHandler(cur)}
              total={10}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
