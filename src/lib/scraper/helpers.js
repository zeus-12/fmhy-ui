import React from "react";

export const logHeading = (headingLevel, headingTitle, markdownHeadings) => {
  if (headingLevel === 1) {
    if (markdownHeadings[headingTitle]) return;

    markdownHeadings[headingTitle] = [];
  } else if (headingLevel === 2) {
    const lastHeading = Object.keys(markdownHeadings).slice(-1)[0];

    if (markdownHeadings[lastHeading]?.includes(headingTitle)) return;

    markdownHeadings[lastHeading] = [
      ...(markdownHeadings[lastHeading]?.length > 0
        ? markdownHeadings[lastHeading]
        : []),
      headingTitle,
    ];
  }

  if (headingLevel === 4 || headingLevel === 3) {
    //storage & piracyguide
    markdownHeadings[headingTitle] = [];
  }
};

export function flatten(text, child) {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

export const classMapping = {
  h1: "text-2xl font-semibold tracking-tighter",
  h2: "text-xl font-medium tracking-medium",
  h3: "text-xl font-medium tracking-medium",
  h4: "text-xl font-medium tracking-medium",
};

export function HeadingRendererHelper(props) {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, "");
  const slug = convertTextToLowerCamelCase(text);

  // prevent duplicate slug for each page -- how to?
  return { slug, text };
}

export const convertTextToLowerCamelCase = (text) => {
  if (!text || typeof text !== "string") return;

  const filteredText = text
    .toLowerCase()
    .replace("▷ ", "")
    .replace("► ", "")
    // remove everything but spaces, alphabets, numbers
    .replace(/[^a-z0-9 ]/g, "");

  // split at spaces, and join them with _
  const splitText = filteredText.split(" ");
  return splitText.filter((item) => item !== "").join("_");
};

export const removeSymbolsInHeading = (text) => {
  if (!text) return;
  return text.replace("▷ ", "").replace("► ", "").replace("►", "");
};

export function redirectRedditLinksToWebsite(link) {
  const redirectLink = link.split(
    "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki"
  )[1];

  return "https://fmhy.ml" + redirectLink;
}
