import React from "react";
import { NoteAlert, WarningAlert } from "../../pages/Links";
import {
  HeadingRendererHelper,
  classMapping,
  convertTextToLowerCamelCase,
  flatten,
  logHeading,
  redirectRedditLinksToWebsite,
} from "./helpers";

export const H1Renderer = (props, CATEGORY, markdownHeadings) => {
  const { slug, text } = HeadingRendererHelper(props);
  logHeading(props.level, text, markdownHeadings);

  return (
    <h1 className={classMapping["h" + props.level] + " group mt-4"} id={slug}>
      <a
        href={`/links/${CATEGORY}/#${convertTextToLowerCamelCase(text)}`}
        className="group-hover:inline-flex hidden"
      >
        #{" "}
      </a>
      {text}
    </h1>
  );
};

export const H2Renderer = (props, CATEGORY, markdownHeadings) => {
  const { slug, text } = HeadingRendererHelper(props);
  logHeading(props.level, text, markdownHeadings);

  // check if it has anchor tag inside, if yes, then check if it starts with reddit link, then replace with redirectRedditLinksToWebsite

  return (
    <h2 className={classMapping["h" + props.level] + " group mt-4"} id={slug}>
      <a
        href={`/links/${CATEGORY}/#${convertTextToLowerCamelCase(text)}`}
        className="group-hover:inline-flex hidden"
      >
        #{" "}
      </a>
      {text}
    </h2>
  );
};

export const H3Renderer = (props) => {
  const { slug, text } = HeadingRendererHelper(props);

  return (
    <h3 className={classMapping["h" + props.level] + " group mt-4"} id={slug}>
      {text}
    </h3>
  );
};

export function LinkRenderer(props) {
  const newProps = { ...props };

  if (
    newProps.href.startsWith("https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki")
  ) {
    newProps.href = redirectRedditLinksToWebsite(newProps.href);
  }

  return <a {...newProps} target="_blank" rel="noopener noreferrer" />;
}

export function LiRenderer(props) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, "");

  // for other note formats use modified version of this, using Array.some method

  // if (text.startsWith("Note - ") || text.startsWith("!!!note")) {
  // const splitText = text.split(
  //   text.startsWith("Note - ") ? "Note - " : "!!!note"
  // );

  if (text.startsWith("Note - ")) {
    const message = text.split("Note - ")[1];
    return <NoteAlert message={message} />;
  } else if (text.startsWith("https://") || text.startsWith("http://")) {
    return (
      <li>
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </li>
    );
  } else {
    return <li className="list-disc ml-6" {...props} />;
  }
}

export const PRenderer = (props) => {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, "");

  if (text.startsWith("!!!note")) {
    const message = text.split("!!!note")[1];

    return <NoteAlert message={message} />;
  } else if (text.startsWith("!!!warning")) {
    const message = text.split("!!!warning")[1];
    return <WarningAlert message={message} />;
  } else {
    return <p {...props} />;
  }
};
