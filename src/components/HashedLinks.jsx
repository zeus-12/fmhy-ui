import { Switch } from "@mantine/core";
import { useEffect, useState } from "react";
import HashedLinkElement from "./HashedLinkElement";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";
// const ITEMS_PER_PAGE = 30;

const HashedLinks = () => {
  const [page, setPage] = useState(1);
  const [links, setLinks] = useState(null);
  const [decodeAllLinks, setDecodeAllLinks] = useState(false);

  const toggleDecodeAllLinks = () => {
    setDecodeAllLinks(!decodeAllLinks);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch(`${SERVER_URL}/api/hashed-links?page=${page}`);
      const data = await res.json();
      setLinks(data.data);
    };
    fetchLinks();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-2xl sm:text-3xl font-semibold tracking-tighter">
          <span className="text-cyan-400">Base 64</span> encoded links
        </p>
        <Switch
          label="Change all"
          checked={decodeAllLinks}
          onChange={toggleDecodeAllLinks}
        />
      </div>
      {links ? (
        links?.map((link, index) => (
          <HashedLinkElement
            key={index}
            title={link.title}
            hash={link.hash}
            showDecoded={decodeAllLinks}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default HashedLinks;
