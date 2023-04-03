import React from "react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MARKDOWN_RESOURCES } from "../lib/CONSTANTS";
import { Alert, Loader } from "@mantine/core";
import { AiFillAlert } from "react-icons/ai";
import { RiAlarmWarningFill } from "react-icons/ri";
import {
  H1Renderer,
  H2Renderer,
  H3Renderer,
  LiRenderer,
  LinkRenderer,
  PRenderer,
} from "../lib/scraper/renderers";
import { convertTextToLowerCamelCase } from "../lib/scraper/helpers";
import { removeSymbolsInHeading } from "../lib/scraper/helpers";

const LinksPage = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  // map from h1 to array of h2 inside it
  // replace this with maps
  const markdownHeadings = {};

  let { CATEGORY } = useParams();
  const markdownCategory = MARKDOWN_RESOURCES.find(
    (item) => item?.urlEnding.toLowerCase() === CATEGORY.toLowerCase()
  );

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (!markdownCategory) return setError(true);
      const markdownUrlEnding = markdownCategory?.urlEnding;

      const markdownUrl =
        "https://raw.githubusercontent.com/nbats/FMHYedit/main/" +
        markdownUrlEnding +
        ".md";

      const res = await fetch(markdownUrl);
      const text = await res.text();

      const cleanedText = text.split("For mobile users")[1];

      setData(cleanedText || text);
    };

    fetchMarkdown();
  }, []);

  if (!markdownCategory) {
    return <Navigate to="/404" replace={true} />;
  }

  return (
    <div className="flex justify-center overflow-hidden h-[calc(100vh_-_6rem)]">
      <LinkCategoriesSidebar markdownCategory={markdownCategory} />

      <div className="flex-1 px-2 sm:px-4 md:px-8 lg:px-14 xl:px-28 overflow-scroll ">
        <p className="text-3xl underline underline-offset-2 font-semibold tracking-tighter">
          {markdownCategory.title}
        </p>

        {error && <p>Something went wrong!</p>}

        {!error && data?.length > 0 ? (
          <ReactMarkdown
            components={{
              h1: (props) => H1Renderer(props, CATEGORY, markdownHeadings),
              h2: (props) => H2Renderer(props, CATEGORY, markdownHeadings),

              h3: H3Renderer, //for beginners guide only
              a: LinkRenderer,
              li: LiRenderer,
              p: PRenderer, // for beginners guide only
              hr: () => <></>,
            }}
          >
            {data}
          </ReactMarkdown>
        ) : (
          <div className="justify-center items-center flex h-[calc(100vh_-_6rem)]">
            <Loader variant="dots" />
          </div>
        )}
      </div>

      <LinkSectionsSidebar
        markdownHeadings={markdownHeadings}
        CATEGORY={CATEGORY}
      />
    </div>
  );
};

const LinkCategoriesSidebar = ({ markdownCategory }) => {
  return (
    <div className="bg-gray-900 border-gray-700 border-r-[1px] h-full overflow-scroll sticky hideScrollbar">
      {/* <p className="text-xl tracking-tighter font-medium">Categories</p> */}
      {MARKDOWN_RESOURCES.map((item) => (
        <div
          key={item.urlEnding}
          className={`${
            item.urlEnding === markdownCategory.urlEnding
              ? "bg-gray-800 border-r-[2px] border-white"
              : ""
          } rounded-sm px-4 my-2 py-1`}
        >
          <a
            href={`/links/${item.urlEnding.toLowerCase()}`}
            className={`${
              item.urlEnding === markdownCategory.urlEnding
                ? "text-gray-300"
                : "text-gray-500"
            } text-md`}
          >
            {item.emoji}
            {"  "}
            <span className="hidden md:inline-flex">{item.title}</span>
          </a>
        </div>
      ))}
    </div>
  );
};

const LinkSectionsSidebar = ({ CATEGORY, markdownHeadings }) => {
  return (
    <div
      className={`${
        CATEGORY === "beginners-guide" ? "hidden" : "hidden md:inline-flex"
      } bg-gray-900 border-l-[1px] border-gray-700 md:flex-col overflow-scroll hideScrollbar min-w-[12rem]`}
    >
      <p className="text-gray-300 text-center">Contents</p>
      {Object.entries(markdownHeadings)?.map((item) => (
        <div key={item[0]} className="px-2 py-2">
          <a
            href={`#${convertTextToLowerCamelCase(item[0])}`}
            // href={`/links/${CATEGORY}/#${convertTextToLowerCamelCase(item[0])}`}
            className="text-gray-500 text-lg"
          >
            {removeSymbolsInHeading(item[0])}
          </a>
          {item[1]?.map((subHeading) => (
            <div key={subHeading} className="px-3 py-[3px]">
              <a
                // href={`/links/${CATEGORY}/#${convertTextToLowerCamelCase(
                href={`#${convertTextToLowerCamelCase(subHeading)}`}
                className="text-gray-500 text-md"
              >
                {removeSymbolsInHeading(subHeading)}
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const NoteAlert = ({ message }) => {
  return (
    <AlertComponent
      title="Note"
      color="cyan"
      message={message}
      icon={<AiFillAlert size="1rem" />}
    />
  );
};

export const AlertComponent = ({ title, color, message, icon }) => {
  return (
    <Alert className="my-2" icon={icon} radius="md" title={title} color={color}>
      {message}
    </Alert>
  );
};

export const WarningAlert = ({ message }) => {
  return (
    <AlertComponent
      title="Warning"
      color="red"
      message={message}
      icon={<RiAlarmWarningFill size="1rem" />}
    />
  );
};

export default LinksPage;

// add this somewhere
//   <div className="gap-2 flex">
// {[
//   {
//     link: "/base64",
//     name: "Base 64",
//     color: "blue",
//   },
//   {
//     link: "/link-queue",
//     name: "Link Queue",
//     color: "pink",
//   },
// ].map((item) => (
//   <Link key={item.link} to={item.link}>
//     <Button compact variant="light" color={item.color}>
//       {item.name}
//     </Button>
//   </Link>
// ))}
// </div>
