import { Button, Input, Loader, Pagination } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// opening a url => the page number on pagination component is incorrect
// have a reset function to reset the search query and page number => upon clickcing "fmhy-search"

const Search = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";
  const ITEMS_PER_PAGE = 30

  const navigate = useNavigate();
  const location = useLocation();

  const page = new URLSearchParams(location.search).get("page") || 1;
  const query = new URLSearchParams(location.search).get("q") || "";

  const [searchQuery, setSearchQuery] = useState(query);
  const [activePage, setActivePage] = useState(page);
  const [searchResults, setSearchResults] = useState(null);
  const searchRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(1)

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const fetchSearchResults = async () => {
    if (!searchQuery || !searchQuery.trim()) return;

    const res = await fetch(
      SERVER_URL + "/api/search?q=" + searchQuery + "&page=" + activePage
    );
    const data = await res.json();
    if (!data.status === "ok") {
      setLoading(false);
      setError(true);
      return;
    }
    setSearchResults(data.data);
    

    setCount(data.count);

    setLoading(false);
    setError(false);
  };

  const searchHandler = async () => {
    if (!searchQuery || !searchQuery.trim()) return;

    navigate("/search?q=" + searchQuery);
    setLoading(true);
    searchRef.current.blur();
    await fetchSearchResults();
  };

  useEffect(() => {
    if (searchQuery) {
      setLoading(true)
      fetchSearchResults();
    }
  }, [activePage]);

  const paginationHandler = async (cur) => {
    navigate("/search?q=" + searchQuery + "&page=" + cur);
    setActivePage(cur);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-[85vh] flex flex-col">
      <p className="text-3xl font-semibold tracking-tight mb-2">
        <span className="text-cyan-400">FMHY</span> Search
      </p>

      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
        className="w-[90vw] sm:w-96"
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

      {!loading && searchResults?.length > 0 && (
        <div className="flex-1 flex flex-col space-y-4 mt-2">
          <p className="text-gray-600">{`${count} results found`}</p>
          {searchResults.map((result, i) => (
            <div
              className="flex flex-col bg-gray-900 space-y-2 p-4 rounded-xl hover:scale-[101%] transition transform duration-100 ease-out"
              // style={{ backdropFilter: "saturate(180%) blur(20px)" }}
              key={i}
            >
              <p className="text-xl font-semibold">{result.title}</p>
              {result.link?.map((link) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 break-words"
                  href={link}
                  key={link}
                >
                  {result.starred ? "🌟" : "•"}
                  <span className="hover:underline underline-offset-2">
                    {link}
                  </span>
                </a>
              ))}
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <Pagination
              page={activePage}
              onChange={(cur) => paginationHandler(cur)}
              total={Math.ceil(count / ITEMS_PER_PAGE)}
            />
          </div>
        </div>
      )}
      {!loading && searchResults?.length === 0 && (
        <div className="flex-1 flex justify-center items-center">
          <p>No results found! Try changing the query</p>
        </div>
      )}
    </div>
  );
};
export default Search;