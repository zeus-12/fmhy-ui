import { useEffect, useState } from "react";

const HashedLinkElement = ({ title, hash, showDecoded }) => {
  const [showHashed, setShowHashed] = useState(!showDecoded);

  useEffect(() => {
    setShowHashed(!showDecoded);
  }, [showDecoded]);

  const getLinksFromHash = () => {
    try {
      const decoded = atob(hash);
      return decoded.split("\n");
    } catch (err) {
      throw new Error("Invalid base64 string");
    }
  };

  return (
    <div
      className="py-2 px-2 guide-item"
      onMouseEnter={() => (!showDecoded ? setShowHashed(false) : () => {})}
      onMouseLeave={() => (!showDecoded ? setShowHashed(true) : () => {})}
    >
      <div className="flex gap-2">
        <p className="font-semibold text-lg">{title}</p>
      </div>

      {!showHashed ? (
        getLinksFromHash().map((link, index) => (
          <a
            key={index}
            className="break-words text-blue-300 block"
            target="_blank"
            rel="noreferrer"
            href={link}
          >
            <span className="pr-1">⭐️</span>
            {link}
          </a>
        ))
      ) : (
        <p className="break-words text-blue-900">{hash}</p>
      )}
    </div>
  );
};
export default HashedLinkElement;
