import { useState } from "react";
import { SiConvertio } from "react-icons/si";

const HashedLinkElement = ({ title, hash, showDecoded }) => {
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
          <SiConvertio
            style={{ width: "1.3rem", height: "1.3rem" }}
            className={`${
              showHashed ? "transform -rotate-90" : "transform rotate-0"
            } transition duration-100 ease-out`}
          />
        </button>
      </div>
      {showDecoded || !showHashed ? (
        getLinksFromHash().map((link, index) => (
          <a
            key={index}
            className="break-words text-blue-300"
            target="_blank"
            rel="noreferrer"
            href={link}
          >
            ⭐️ {link}
          </a>
        ))
      ) : (
        <p className="break-words text-blue-300">{hash}</p>
      )}
    </div>
  );
};
export default HashedLinkElement;
