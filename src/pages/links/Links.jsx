import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { formatName } from "../../lib/helper";
import Error404 from "../404";
import { SERVER_URL } from "../../lib/config";

const Links = () => {
  const [resources, setResources] = useState("");
  const [error, setError] = useState(false);

  let { resource } = useParams();

  useEffect(() => {
    setResources("Loading...");
    const url = SERVER_URL + "/api/wiki/" + resource;
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.data)

      .then((prev) => prev.substring(prev.indexOf("# ►")))

      .then((finalData) => setResources(finalData))
      .catch((error) => {
        setError(true);
        setResources();
      });
  }, [resource]);

  return (
    <div className="resources p-4 pt-0">
      {error && <Error404 />}
      <p
        className="text-capitalize mb-0 tracking-tight font-semibold"
        style={{ fontSize: "2rem" }}
      >
        {error || formatName(resource)}
      </p>
      <ReactMarkdown>{resources}</ReactMarkdown>
    </div>
  );
};

export default Links;
