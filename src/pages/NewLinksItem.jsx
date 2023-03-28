import React from "react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LinksPage = () => {
  const [data, setData] = useState();
  let { resource } = useParams();

  useEffect(() => {
    const url = "https://raw.githubusercontent.com/nbats/FMHYedit/main/AI.md";
    fetch(url)
      .then((res) => res.text())
      .then((finalData) => setData(finalData));
  }, []);

  function flatten(text, child) {
    return typeof child === "string"
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text);
  }

  function HeadingRenderer(props) {
    var children = React.Children.toArray(props.children);
    var text = children.reduce(flatten, "");
    var slug = text
      .toLowerCase()
      .replace("▷ ", "")
      .replace("► ", "")
      .replace(/\W/g, "_");
    return React.createElement("h" + props.level, { id: slug }, props.children);
  }

  return (
    <ReactMarkdown
      // source={data}
      components={{ h2: HeadingRenderer, h1: HeadingRenderer }}
    >
      {data}
    </ReactMarkdown>
  );
};

export default LinksPage;
