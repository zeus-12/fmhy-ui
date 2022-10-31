import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/AddGuide.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

const GuideItemsGenerator = ({ data, updateData, noResultMessage }) => {
  const { username, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const editLink = async (e) => {
    let idToEdit = e.target.id;
    navigate("/guides/edit/" + idToEdit);
  };

  const deleteLink = async (e) => {
    let idToDelete = e.target.id;

    const req = await fetch(SERVER_URL + "/api/guides/delete/" + idToDelete, {
      method: "DELETE",
      headers: { "x-access-token": localStorage.getItem("token") },
    });
    const data = await req.json();
    if (data.status === "ok") {
      updateData((prevData) =>
        prevData.filter((link) => link._id !== data.deletedGuide._id)
      );
    }
  };

  const links_to_component = (links) => {
    if (links && links.length !== 0) {
      const component = links.map((item) => (
        <div key={item._id} className="guide-item ">
          <div>
            <div
              key={item._id}
              className="flex justify-between items-center pt-2"
            >
              <li>
                <a
                  className="inline"
                  style={{ fontSize: "1.1rem" }}
                  target="_blank"
                  href={item.link}
                  rel="noreferrer"
                >
                  {item.title}{" "}
                  <span style={{ color: "#ff6600" }}>
                    {item.nsfw ? "NSFW" : ""}
                  </span>
                </a>
              </li>
              {username && (item.owner === username || isAdmin) && (
                <div className="flex mr-2">
                  {/* edit */}
                  <svg
                    id={item._id}
                    onClick={editLink}
                    width="24"
                    height="24"
                    stroke="grey"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id={item._id}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>

                  {/* delete */}

                  <svg
                    id={item._id}
                    onClick={deleteLink}
                    width="24"
                    height="24"
                    stroke="grey"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id={item._id}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
            <div className="flex items-center">
              {/* tags */}
              {item.tags && (
                <div>
                  {/* replace tags with item.tags */}
                  <ul className="tags" style={{ listStyleType: "none" }}>
                    {item.tags.map((tag, index) => (
                      <li key={index} className="tag">
                        <span className="">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.credits && (
                <div>
                  <p className="m-0">🙏 {item.credits}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ));
      return component;
    } else {
      return noResultMessage;
    }
  };
  return <div>{links_to_component(data)}</div>;
};

export default GuideItemsGenerator;
