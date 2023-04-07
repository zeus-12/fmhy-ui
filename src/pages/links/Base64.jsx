import { Switch } from "@mantine/core";
import { useEffect, useState } from "react";
import Base64Element from "../../components/Base64Element";
import { SERVER_URL } from "../../lib/config";

// const ITEMS_PER_PAGE = 30;

const Base64 = () => {
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
    <div className="px-6">
      <div className="flex justify-between">
        <p className="text-2xl sm:text-3xl font-semibold tracking-tighter">
          <span className="text-cyan-400">Base 64</span> Encoded links
        </p>
        <Switch
          label="Change all"
          checked={decodeAllLinks}
          onChange={toggleDecodeAllLinks}
        />
      </div>
      {links ? (
        links?.map((link, index) => (
          <Base64Element
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
export default Base64;
