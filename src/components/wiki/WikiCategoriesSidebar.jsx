import { Switch } from "@mantine/core";
import { MARKDOWN_RESOURCES } from "../../lib/CONSTANTS";
import { useState } from "react";

const CategoriesSidebar = ({ markdownCategory }) => {
  const toggleNsfw = () => setIncludeNsfw((prev) => !prev);
  const [includeNsfw, setIncludeNsfw] = useState(false);

  return (
    <div className="bg-[#050a15] border-gray-700 border-r-[1px] h-full overflow-scroll sticky hideScrollbar">
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
            href={`/wiki/${item.urlEnding.toLowerCase()}`}
            className={`${
              item.urlEnding === markdownCategory.urlEnding
                ? "text-gray-300"
                : "text-gray-500"
            } group-hover:text-slate-300`}
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

export default CategoriesSidebar;
