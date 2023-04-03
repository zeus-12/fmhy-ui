import { Link } from "react-router-dom";
import "../styles/guides.css";
import { formatName } from "../lib/helper";
import { category_channels } from "../lib/CONSTANTS";
import { Button } from "@mantine/core";

const LinksPage = () => {
  let sortedCateogryChannels = category_channels.sort(
    (a, b) => a.channels.length < b.channels.length
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="pr-2 pt-0 pl-4 mb-0 text-3xl text-cyan-300 tracking-tight font-semibold">
          Links
        </p>
        <div className="gap-2 flex">
          {[
            {
              link: "/base64",
              name: "Base 64",
              color: "blue",
            },
            {
              link: "/link-queue",
              name: "Link Queue",
              color: "pink",
            },
          ].map((item) => (
            <Link key={item.link} to={item.link}>
              <Button compact variant="light" color={item.color}>
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <p className="text-gray-400 p-2 pl-4 pt-0">
        Restored from old discord backup
      </p>

      <div className="flex flex-wrap justify-center">
        {sortedCateogryChannels.map((item, index) => (
          <Link
            to={item.category.split(" ")[0]}
            className="m-1 rounded-md w-[95vw] md:w-[44vw] xl:w-[25vw] guide-item"
            style={{
              backgroundColor: "rgb(17, 16, 16)",
              border: "0.1px solid rgb(91, 91, 91)",
            }}
            key={index}
          >
            <div className="text-light p-4">
              <h1 className="mb-0" style={{ color: "rgb(224, 250, 241)" }}>
                {formatName(item.category)}
              </h1>

              <div className="flex flex-col flex-wrap  max-h-[15rem] ">
                {item.channels.map((channel, index) => (
                  <p
                    key={index}
                    className="inline mb-0"
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(226, 226, 226, 0.91)",
                    }}
                  >
                    {formatName(channel)}
                  </p>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LinksPage;
