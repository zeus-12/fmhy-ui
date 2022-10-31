import React, { useState, useEffect, useRef, useContext } from "react";
import GuideItemsGenerator from "./GuideItemsGenerator";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { ErrorNotification } from "./Notification";
import { Input } from "@mantine/core";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

const Guides = () => {
  const [noResultMessage, setNoResultMessage] = useState("Loading...");
  const { username } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addGuideHandler = () => {
    console.log(username);
    if (!username) {
      setError("Login to add Guides!");
      setTimeout(() => setError(), 3000);
    } else navigate("/guides/add");
  };
  //storing search query
  const [inputText, setInputText] = useState("");

  //for flex-direction
  const [flexDir, setFlexDir] = useState("");

  //toggling on and off the search bar, and the x,search icons
  const [inputToggle, setInputToggle] = useState("hidden");
  const [guideList, setGuideList] = useState();
  //ref for input focus
  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputToggle]);

  useEffect(() => {
    fetch(SERVER_URL + "/api/guides/all")
      .then((res) => res.json())
      .then((data) => setGuideList(data))
      .catch((err) => {
        console.log(err);
        setNoResultMessage("Can't connect to the Server!");
      });
  }, []);

  const toggleSearch = () => {
    if (inputToggle === "hidden") {
      setInputToggle("flex");
      setFlexDir("flex-col");
    } else setInputToggle("hidden");
  };

  const toggleClose = () => {
    setInputText("");
    if (inputToggle === "flex") {
      setInputToggle("hidden");
      setFlexDir("");
    } else setInputToggle("flex");
  };

  let inputHandler = (e) => {
    var lowerCase = e.target.value;
    setInputText(lowerCase);
  };

  const filterData = (data) => {
    if (data) {
      const filter_data = data.filter((el) => {
        if (inputText === "") {
          return el;
        } else {
          return el.title.toLowerCase().includes(inputText.toLowerCase());
        }
      });

      return filter_data;
    }
  };

  const classes = "justify-between flex sm:flex-row " + flexDir;

  return (
    <div className="p-4 pt-0">
      {error && <ErrorNotification error={error} />}
      <div className={classes}>
        <p onClick={() => setInputText("")} className="mb-0 inline text-3xl">
          Guides
        </p>
        <div className="flex sm:ml-auto items-center pr-4">
          <div className="search flex items-center pl-4">
            {/* todo: add hover change icon to pointer */}
            <Input
              className={inputToggle}
              type="text"
              value={inputText}
              ref={inputElement}
              onChange={inputHandler}
              autoFocus
              variant="filled"
              placeholder="Search Guide"
            />
            {/* search button */}
            {inputToggle === "hidden" && (
              <div className=" hover:cursor-pointer" onClick={toggleSearch}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            )}

            {/* close button  */}
            {inputToggle === "flex" && (
              <div className="pl-2 hover:cursor-pointer" onClick={toggleClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  // class="h-18 w-18"
                  fill="none"
                  width="25"
                  height="25"
                  viewBox="0 0 14 14"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            )}
          </div>
          {/* plus icon  */}
          <div onClick={addGuideHandler} className="ml-2">
            <svg
              width="25"
              height="25"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <ul>
        <GuideItemsGenerator
          data={filterData(guideList)}
          updateData={setGuideList}
          noResultMessage={
            filterData(guideList)?.length === 0
              ? "No results found"
              : noResultMessage
          }
        />
      </ul>
    </div>
  );
};

export default Guides;
