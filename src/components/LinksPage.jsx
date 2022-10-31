import { Link } from "react-router-dom";
import "../styles/AddGuide.css";
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
        <p className="p-2 pt-0 pl-4 mb-0 text-3xl text-green-800 ">Links</p>
        <Link to="/submit-link">
          <Button className="bg-yellow-700 hover:bg-yellow-600">
            Submit Link
          </Button>
        </Link>
      </div>
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
