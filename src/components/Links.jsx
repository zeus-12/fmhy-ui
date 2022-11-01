import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { formatName } from "../lib/helper";
import { category_channels } from "../lib/CONSTANTS";
import { IoMdArrowDropdown } from "react-icons/io";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";
const Links = () => {
  const navigate = useNavigate();

  const editLink = () => {};
  const deleteLink = () => {};
  const { CATEGORY } = useParams();
  const [links, setLinks] = useState([]);
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    const category = [];
    category_channels.forEach((item) => {
      category.push(item.category);
    });

    if (!category.includes(CATEGORY)) {
      navigate("/404");
    }

    let allChannels = category_channels.find(
      (item) => item.category === CATEGORY
    ).channels;
    setChannels(allChannels);

    const fetchLinks = async () => {
      const req = await fetch(SERVER_URL + "/api/links/" + CATEGORY);
      let data = await req.json();
      data = data.data;
      setLinks(data);
    };
    fetchLinks();
  }, []);

  return (
    <div className="p-2">
      <div className="flex justify-between ">
        <p className="text-3xl font-bold tracking-tight">
          {formatName(CATEGORY)}
        </p>
      </div>
      {links?.length === 0 ? (
        "Loading"
      ) : (
        <div>
          {channels.map((channelName, index) => {
            return (
              <LinksContainer
                key={index}
                links={links}
                channelName={channelName}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Links;

const LinksContainer = ({ channelName, links }) => {
  const { isAdmin } = useContext(UserContext);

  const [hidden, setHidden] = useState(false);
  return (
    <div>
      <div className="flex justify-between pr-4">
        <p className="text-2xl font-semibold tracking-tight">
          {formatName(channelName)}
        </p>
        <IoMdArrowDropdown
          className={hidden ? "transform -rotate-90" : "transform rotate-0"}
          onClick={() => setHidden(!hidden)}
          style={{ width: "2rem", height: "2rem" }}
        />
      </div>
      <div
        className={`grid auto-rows-max justify-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-3 ${
          hidden ? "hidden" : ""
        }`}
      >
        {links
          .filter((item) => item.channel === channelName)
          .map((link) => (
            <div
              className="bg-gray-900 hover:scale-105 transition transform duration-100 ease-out  mb-3 p-2 inline-block mr-2 rounded-md"
              key={link._id}
            >
              {/* title */}

              <p className="m-0 break-words" style={{ color: "#5BA9E7" }}>
                {link.title}
              </p>

              {/* descritpion */}
              {link.description && <p className="m-0">{link.description}</p>}

              {/* link */}
              {link.link.map((item, index) => (
                <a key={index} href={item}>
                  <li className="m-0 break-words text-">{item}</li>
                </a>
              ))}

              {/* delete and edit icon	 */}
              {isAdmin && (
                // add a tick svg inside to add it to the selected channel
                <div className="flex mr-2">
                  {/* edit */}
                  <svg
                    id={link._id}
                    onClick={editLink}
                    width="24"
                    height="24"
                    stroke="grey"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id={link._id}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>

                  {/* delete */}

                  <svg
                    id={link._id}
                    onClick={deleteLink}
                    width="24"
                    height="24"
                    stroke="grey"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id={link._id}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
