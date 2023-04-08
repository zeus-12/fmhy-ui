import React, { useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { MARKDOWN_RESOURCES } from "../../lib/CONSTANTS";
import { Alert, Button, Loader, Menu, Switch } from "@mantine/core";
import {
  AiFillAlert,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { RiAlarmWarningFill } from "react-icons/ri";
import {
  H1Renderer,
  H2Renderer,
  H3Renderer,
  H4Renderer,
  LiRenderer,
  LinkRenderer,
  PRenderer,
} from "../../lib/scraper/renderers";
import { convertTextToLowerCamelCase } from "../../lib/scraper/helpers";
import { removeSymbolsInHeading } from "../../lib/scraper/helpers";
import { resources as menuItems } from "../../lib/CONSTANTS";

const Links = () => {
  let { CATEGORY } = useParams();

  const markdownCategory = MARKDOWN_RESOURCES.find(
    (item) => item?.urlEnding.toLowerCase() === CATEGORY.toLowerCase()
  );

  if (!markdownCategory && CATEGORY !== "home") {
    return <Navigate to="/404" replace={true} />;
  }

  return (
    <div className="flex justify-between overflow-hidden h-[calc(100vh_-_6rem)] gap-2">
      <LinkCategoriesSidebar markdownCategory={markdownCategory} />

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

  const [starredLinks, setStarredLinks] = useState(false);
  // replace this with maps
  const markdownHeadings = {};

  // const [scrollY, setScrollY] = useState(0);

  // const linksDataRef = useRef(null);

  // const handleScroll = useCallback(() => {
  //   setScrollY(linksDataRef.current.getBoundingClientRect());
  // }, []);
  // useEffect(() => {
  //   document.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => document.removeEventListener("scroll", handleScroll);
  // }, [handleScroll]);

  // const handleScrollUp = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

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
      <div className="flex-1 sm:px-4 md:px-8 lg:px-14 xl:px-20 overflow-scroll">
        <div className="flex justify-between items-center">
          <p className="text-3xl underline underline-offset-2 font-semibold tracking-tighter">
            {markdownCategory.title}
          </p>
          <Switch
            className={
              ["beginners-guide", "storage"].includes(CATEGORY) ? "hidden" : ""
            }
            label="Recommended?"
            size="xs"
            checked={starredLinks}
            onChange={(event) => setStarredLinks(event.currentTarget.checked)}
          />
        </div>
        {error && <p>Something went wrong!</p>}

        {!error && data?.length > 0 ? (
          <>
            <ReactMarkdown
              components={{
                h1: (props) => H1Renderer(props, markdownHeadings),
                h2: (props) => H2Renderer(props, markdownHeadings),
                h3: (props) => H3Renderer(props, markdownHeadings), //for beginners guide only
                h4: (props) => H4Renderer(props, markdownHeadings), //for storage only
                p: PRenderer, // for beginners guide only
                a: LinkRenderer,
                li: (props) => LiRenderer(props, starredLinks), //for storage only
                hr: () => <></>,
              }}
            >
              {data}
            </ReactMarkdown>
            {/* 
            {scrollUp && (
              <div
                onClick={handleScrollUp}
                className="fixed bottom-5 right-5 mr-4 mb-4"
              >
                <BsFillArrowUpCircleFill className="w-8 h-8" />
              </div>
            )} */}
          </>
        ) : (
          <div className="justify-center items-center flex h-[calc(100vh_-_6rem)]">
            <Loader variant="dots" />
          </div>
        )}

        <BottomLinksNavigator CATEGORY={CATEGORY} />
      </div>
      <LinksContentsSidebar
        markdownHeadings={markdownHeadings}
        CATEGORY={CATEGORY}
      />
    </>
  );
};

const BottomLinksNavigator = ({ CATEGORY }) => {
  const currentCategoryIndex = MARKDOWN_RESOURCES.findIndex(
    (item) => item?.urlEnding.toLowerCase() === CATEGORY.toLowerCase()
  );
  return (
    <div
      className={`flex gap-2 my-4 w-full ${
        currentCategoryIndex === 0
          ? "justify-end"
          : currentCategoryIndex === MARKDOWN_RESOURCES.length - 1
          ? "justify-start"
          : "justify-center"
      }`}
    >
      {[
        {
          ele: MARKDOWN_RESOURCES[currentCategoryIndex - 1],
          icon: (
            <AiOutlineArrowLeft className="group-hover:animate-bounce w-7 h-7 text-gray-400" />
          ),
          text: "Previous",
        },
        {
          ele: MARKDOWN_RESOURCES[currentCategoryIndex + 1],
          icon: (
            <AiOutlineArrowRight className="group-hover:animate-bounce w-7 h-7 text-gray-400" />
          ),
          text: "Next",
        },
      ].map(
        (item, i) =>
          item.ele && (
            <Link
              key={i}
              to={`/links/${item.ele.urlEnding.toLowerCase()}`}
              className="max-w-[20rem] w-full group"
            >
              <div
                className={`border-[1px] w-full border-gray-400 px-4 py-6 rounded-lg flex gap-2 justify-start ${
                  i === 0 ? "" : "flex-row-reverse"
                } ${currentCategoryIndex === 0 ? "ml-auto" : "mr-auto"}`}
              >
                {item.icon}
                <div className="">
                  <p className="text-gray-400">{item.text}</p>
                  <p>{item.ele.title}</p>
                </div>
              </div>
            </Link>
          )
      )}
    </div>
  );
};

const LinkCategoriesSidebar = ({ markdownCategory }) => {
  const toggleNsfw = () => setIncludeNsfw((prev) => !prev);
  const [includeNsfw, setIncludeNsfw] = useState(false);

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

const LinksContentsSidebar = ({ CATEGORY, markdownHeadings }) => {
  return (
    <div
      className={`${
        ["home"].includes(CATEGORY) ? "hidden" : "hidden md:inline-flex"
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
              &#x203A; {removeSymbolsInHeading(item[0])}
            </a>
            {item[1]?.map((subHeading) => (
              <div key={subHeading} className="px-3 py-[3px]">
                <a
                  href={`#${convertTextToLowerCamelCase(subHeading)}`}
                  className="text-gray-500 text-sm"
                >
                  &#xbb; {removeSymbolsInHeading(subHeading)}
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

      <div className="bg-gray-800 p-4 px-6 rounded-xl">
        <p className="text-blue-200">Kinda clone of retype, STILL A WIP! </p>

        <p className="font-semibold text-red-200">Todos/ Knows bugs</p>
        {[
          "Update toc on scroll",
          "same h2 names - edupiracy guides",
          "fix linkings, toc in storage, beginners guide",
        ].map((item) => (
          <li className="list-disc" key={item}>
            {item}
          </li>
        ))}
      </div>
      <BottomLinksNavigator CATEGORY={"home"} />
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
