import { Button, Input, Loader, Pagination, Switch } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../lib/config";
import { AiOutlineSearch } from "react-icons/ai";
const Search = () => {
  const ITEMS_PER_PAGE = 30;

  const navigate = useNavigate();
  const location = useLocation();

  const pageParam = new URLSearchParams(location.search).get("page");
  const page = pageParam ? parseInt(pageParam) : 1;
  const query = new URLSearchParams(location.search).get("q") || "";
  const nsfw =
    new URLSearchParams(location.search).get("nsfw") === "true" ? true : false;

  const [searchQuery, setSearchQuery] = useState(query);
  const [activePage, setActivePage] = useState(page);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(1);
  const [includeNsfw, setIncludeNsfw] = useState(nsfw);

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      fetchSearchResults();
    }
  }, [activePage, includeNsfw]);

  const navigatePage = (page, nsfw = includeNsfw, query = searchQuery) => {
    navigate("/search?q=" + query + "&page=" + page + "&nsfw=" + nsfw);
  };

  const fetchSearchResults = async () => {
    if (!searchQuery || !searchQuery.trim()) return;

    const res = await fetch(
      SERVER_URL +
        "/api/search?q=" +
        searchQuery +
        "&page=" +
        activePage +
        "&nsfw=" +
        includeNsfw
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

    setActivePage(1);
    navigatePage(1);

    setLoading(true);
    searchRef.current.blur();
    await fetchSearchResults();
  };

  const paginationHandler = async (cur) => {
    setActivePage(cur);
    navigatePage(cur);
    window.scrollTo(0, 0);
  };

  const toggleNsfw = (e) => {
    setIncludeNsfw(e.target.checked);

    setActivePage(1);
    navigatePage(1, e.target.checked);
  };

  const resetSearch = () => {
    navigate("/search");
    setSearchQuery("");
    setActivePage(1);
    setSearchResults(null);
  };

  return (
    <div className="min-h-[calc(100vh_-_6rem)] flex flex-col px-6">
      <div className="flex justify-between items-center">
        <p
          onClick={resetSearch}
          className="text-3xl font-semibold tracking-tighter hover:cursor-pointer"
        >
          <span className="text-cyan-400">FMHY</span> Search
        </p>
        <Switch label="NSFW?" checked={includeNsfw} onChange={toggleNsfw} />
      </div>

      <p className="text-gray-400 mb-2">
        Missing links from{" "}
        <a
          className="text-gray-400 underline"
          href="https://github.com/nbats/FMHYedit/blob/main/STORAGE.md"
        >
          storage
        </a>
      </p>

      <Input
        placeholder="Try Adblocker"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchHandler();
          }
        }}
        ref={searchRef}
        rightSection={<AiOutlineSearch className="w-5 h-5 text-gray-400" />}
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
                  <p>
                    <span className="pr-1 text-white">
                      {result.starred ? "⭐️" : "•"}
                    </span>
                    <span className="hover:underline underline-offset-2">
                      {link}
                    </span>
                  </p>
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
