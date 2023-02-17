import { useState } from "react";
import { SiConvertio } from "react-icons/si";

const HashedLinkElement = ({ title, hash }) => {
  const [showHashed, setShowHashed] = useState(true);

  const toggleShowHashedLink = () => {
    setShowHashed(!showHashed);
  };

  const getLinksFromHash = () => {
    try {
      const decoded = atob(hash);
      return decoded.split("\n");
    } catch (err) {
      throw new Error("Invalid base64 string");
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <p className="font-semibold text-lg">{title}</p>
        <button onClick={toggleShowHashedLink}>
          <SiConvertio />
        </button>
      </div>
      {showHashed ? (
        <p className="break-words text-blue-300">{hash}</p>
      ) : (
        getLinksFromHash().map((link, index) => (
          <a
            key={index}
            className="break-words text-blue-300 flex"
            target="_blank"
            rel="noreferrer"
            href={link}
          >
            ⭐️ {link}
          </a>
        ))
      )}
    </div>
  );
};
export default HashedLinkElement;
