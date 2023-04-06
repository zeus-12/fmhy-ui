import React from "react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { MARKDOWN_RESOURCES } from "../lib/CONSTANTS";
import { Alert, Button, Loader, Menu, Switch } from "@mantine/core";
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
import { resources as menuItems } from "../lib/CONSTANTS";

const Links = () => {
  const toggleNsfw = () => setIncludeNsfw((prev) => !prev);
  let { CATEGORY } = useParams();
  const [includeNsfw, setIncludeNsfw] = useState(false);

  const markdownCategory = MARKDOWN_RESOURCES.find(
    (item) => item?.urlEnding.toLowerCase() === CATEGORY.toLowerCase()
  );

  if (!markdownCategory && CATEGORY !== "home") {
    return <Navigate to="/404" replace={true} />;
  }

  return (
    <div className="flex justify-between overflow-hidden h-[calc(100vh_-_6rem)] gap-2">
      <LinkCategoriesSidebar
        markdownCategory={markdownCategory}
        toggleNsfw={toggleNsfw}
        includeNsfw={includeNsfw}
      />

      {CATEGORY?.toLowerCase() === "home" ? (
        <LinksHomePage />
      ) : (
        <LinkDataRenderer
          CATEGORY={CATEGORY}
          markdownCategory={markdownCategory}
        />
      )}
    </div>
  );
};

const LinkDataRenderer = ({ CATEGORY, markdownCategory }) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  // map from h1 to array of h2 inside it
  // replace this with maps
  const markdownHeadings = {};

  useEffect(() => {
    const currentUrl = window.location.href;

    if (!data || !currentUrl.includes("#")) return;

    const id = currentUrl.split("#").at(-1);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  useEffect(() => {
    const markdownUrlEnding = markdownCategory?.urlEnding;

    if (!markdownUrlEnding) {
      return;
    }
    const fetchMarkdown = async () => {
      if (!markdownCategory) return setError(true);

      const markdownUrl =
        "https://raw.githubusercontent.com/nbats/FMHYedit/main/" +
        markdownUrlEnding +
        ".md";
      try {
        const res = await fetch(markdownUrl);
        const text = await res.text();

        const cleanedText = text.split("For mobile users")[1];

        setData(cleanedText || text);
      } catch (err) {
        setError(true);
      }
    };

    fetchMarkdown();
  }, [markdownCategory, markdownCategory?.urlEnding]);

  return (
    <>
      <div className="flex-1 sm:px-4 md:px-8 lg:px-14 xl:px-28 overflow-scroll ">
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
    </>
  );
};

const LinkCategoriesSidebar = ({
  markdownCategory,
  toggleNsfw,
  includeNsfw,
}) => {
  return (
    <div className="bg-[#0E131F] border-gray-700 border-r-[1px] h-full overflow-scroll sticky hideScrollbar">
      <div className="items-center px-4 pt-2 justify-between hidden md:flex">
        <p className="text-xl tracking-tighter font-medium ">Categories</p>
        <Switch
          label="NSFW?"
          size="xs"
          checked={includeNsfw}
          onChange={toggleNsfw}
        />
      </div>

      {MARKDOWN_RESOURCES.filter((item) =>
        includeNsfw ? item : item.urlEnding !== "NSFWPiracy"
      ).map((item) => (
        <div
          key={item.urlEnding}
          className={`${
            item.urlEnding === markdownCategory.urlEnding
              ? "bg-gray-800 border-r-[2px] border-white"
              : ""
          } rounded-sm px-4 my-2 py-1 group`}
        >
          <a
            href={`/links/${item.urlEnding.toLowerCase()}`}
            className={`${
              item.urlEnding === markdownCategory.urlEnding
                ? "text-gray-300"
                : "text-gray-500"
            } text-md group-hover:text-blue-300`}
          >
            <span className="group-hover:animate-pulse">{item.emoji}</span>
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
        ["beginners-guide", "home", "storage"].includes(CATEGORY)
          ? "hidden"
          : "hidden md:inline-flex"
      } bg-[#0E131F] border-l-[1px] border-gray-700 md:flex-col overflow-scroll hideScrollbar min-w-[12rem]`}
    >
      <p className="text-xl tracking-tighter font-medium px-1 pt-2">Contents</p>
      {Object.entries(markdownHeadings).length > 0 ? (
        Object.entries(markdownHeadings)?.map((item) => (
          <div key={item[0]} className="px-2 py-1">
            <a
              href={`#${convertTextToLowerCamelCase(item[0])}`}
              className="text-gray-500 text-base"
            >
              {removeSymbolsInHeading(item[0])}
            </a>
            {item[1]?.map((subHeading) => (
              <div key={subHeading} className="px-3 py-[3px]">
                <a
                  href={`#${convertTextToLowerCamelCase(subHeading)}`}
                  className="text-gray-500 text-sm"
                >
                  {removeSymbolsInHeading(subHeading)}
                </a>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="justify-center items-center flex h-[calc(100vh_-_6rem)]">
          <Loader variant="dots" />
        </div>
      )}
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

const LinksHomePage = () => {
  return (
    <div className="flex-1 sm:px-4 md:px-8 lg:px-14 xl:px-28 overflow-scroll space-y-4">
      <p className="text-3xl underline underline-offset-2 font-semibold tracking-tighter">
        Welcome 🙏
      </p>

      <p className="text-xl font-semibold tracking-tighter text-cyan-400">
        Welcome to The Largest Collection of Free Stuff On The Internet!
      </p>

      <div>
        <p className="text-xl font-semibold tracking-tighter">
          Few other resources
        </p>

        <div className="gap-2 flex">
          {[
            {
              link: "",
              name: <RedditScrapedWikiMenu />,
              color: "orange",
            },
            {
              link: "/base64",
              name: "Base 64",
              color: "blue",
            },
            // {
            //   link: "/link-queue",
            //   name: "Link Queue",
            //   color: "pink",
            // },
          ].map((item) => (
            <Link key={item.link} to={item.link}>
              <Button variant="light" color={item.color}>
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        <p className="text-blue-200">Kinda clone of retype, STILL A WIP! </p>

        <p className="font-semibold text-red-200">Todos/ Knows bugs</p>
        {[
          "Update toc on scroll",
          "same h2 name diff h1 => for h2 make it /links/catgegory/h1name/h2name ?? : link - http://localhost:5173/links/edupiracyguide/#courses",
          "Add next/previous at the end",
          "fix linkings, toc in storage, beginners guide",
        ].map((item) => (
          <li className="list-disc" key={item}>
            {item}
          </li>
        ))}
      </div>
    </div>
  );
};

const RedditScrapedWikiMenu = () => {
  return (
    <Menu menuButtonLabel="Resources">
      <Menu.Target>
        <p className="px-0.5 py-1 lg:px-2 rounded-md  cursor-pointer text-center">
          Reddit Scraped
        </p>
      </Menu.Target>
      <Menu.Dropdown className="h-72 overflow-scroll">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.link}>
            <Menu.Item icon={item.emoji}>{item.title}</Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default Links;
