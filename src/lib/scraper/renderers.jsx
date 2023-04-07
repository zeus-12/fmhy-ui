import React from "react";
import { NoteAlert, WarningAlert } from "../../pages/Links";
import {
  HeadingRendererHelper,
  classMapping,
  convertTextToLowerCamelCase,
  flatten,
  logHeading,
  redirectRedditLinksToWebsite,
  removeSymbolsInHeading,
} from "./helpers";

export const H1Renderer = (props, CATEGORY, markdownHeadings) => {
  const { slug, text } = HeadingRendererHelper(props);
  logHeading(props.level, text, markdownHeadings);

  return (
    <h1 className={classMapping["h" + props.level] + " group mt-4"} id={slug}>
      <a
        href={`#${convertTextToLowerCamelCase(text)}`}
        className="group-hover:inline-flex hidden"
      >
        #{" "}
      </a>
      &#x203A; {removeSymbolsInHeading(text)}
    </h1>
  );
};

const redditToGithubTitleMapping = {
  "adblock-vpn-privacy": "adblockvpnguide",
  android: "android-iosguide",
  reading: "readingpiracyguide",
  download: "downloadpiracyguide",
  edu: "edupiracyguide",
  games: "gamingpiracyguide",
  linux: "linuxguide",
  misc: "miscguide",
  video: "videopiracyguide",
  audio: "audiopiracyguide",
  "non-eng": "non-english",
  storage: "storage",
  torrent: "torrentpiracyguide",
  ai: "ai",
  beginners_guide: "beginners_guide",
  "img-tools": "img-tools",
  "tools-misc": "toolsguide",
  // :"devtools",
  // :"nsfwpiracy"
};

export const H2Renderer = (props, CATEGORY, markdownHeadings) => {
  let { slug, text } = HeadingRendererHelper(props);
  let href = `#${convertTextToLowerCamelCase(text)}`;

  logHeading(props.level, text, markdownHeadings);

  if (props.node.children[1]?.tagName === "a") {
    const eleHref = props.node.children[1]?.properties.href;
    if (
      eleHref.startsWith("https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/")
    ) {
      //TODO:  use better approach for this
      // linking doesnt work for tags with "/" in name : cause of weird url shit
      // file tools in downloading --> h1 tag
      // to check for educational onwards

      // /linux/#wiki_.25BA_mac_software  ==> /linux/#mac_software
      const slugEnding = eleHref?.split("/wiki/")[1];

      // linux#wiki_.25BA_mac_software  ==> /linux/#mac_software
      const category = slugEnding.split("#")[0].replaceAll("/", "");

      const temp = slugEnding.split("#")[1];

      if (temp?.includes("wiki_")) {
        const newTemp = temp.split("wiki_")[1];

        // check if newTemp has the weird number thing
        if (newTemp.startsWith(".")) {
          const splitArray = newTemp.split("_");
          splitArray.shift();
          const idTag = splitArray.join("_");
          href = redditToGithubTitleMapping[category] + "/#" + idTag;
        } else {
          href = redditToGithubTitleMapping[category] + "/#" + newTemp;
        }
      }

      // // wiki_.25BA_mac_software  ==> mac_software
      // const splitArray = slugEnding.split("#wiki_.")[1]?.split("_");
      // if (!splitArray) return;
      // // [25BA, mac, software]  ==> mac_software
      // splitArray.shift();
      // const idTag = splitArray.join("_");
      // href = redditToGithubTitleMapping[category] + "/#" + idTag;
    } else {
      console.log("not reddit link", eleHref);
    }
  }

  return (
    <h2 className={classMapping["h" + props.level] + " group mt-4"} id={slug}>
      <a href={href} className="group-hover:inline-flex hidden">
        #{" "}
      </a>
      &#xbb; {removeSymbolsInHeading(text)}
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

  // if (text.startsWith("!!!note") || text.startsWith("Note - ")) {

  const NOTE_STARTERS = ["!!!note", "Note - "];
  const WARNING_STARTERS = ["!!!warning", "Warning - "];

  if (NOTE_STARTERS.some((item) => text.startsWith(item))) {
    const splitText = NOTE_STARTERS.find((item) => text.startsWith(item));
    const message = text.split(splitText)[1];

    return <NoteAlert message={message} />;
  } else if (WARNING_STARTERS.some((item) => text.startsWith(item))) {
    const splitText = WARNING_STARTERS.find((item) => text.startsWith(item));
    const message = text.split(splitText)[1];

    return <WarningAlert message={message} />;
  } else {
    return <p {...props} />;
  }
};
