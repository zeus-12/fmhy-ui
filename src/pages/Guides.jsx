import React, { useState, useEffect, useRef, useContext } from "react";
import GuideElement from "../components/GuideElement";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Input } from "@mantine/core";
import { SERVER_URL } from "../lib/config";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { errorNotification } from "../components/Notifications";

const Guides = () => {
  const { username } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [guides, setGuides] = useState();
  const [flexDir, setFlexDir] = useState("");

  //toggling on and off the search bar, and the x,search icons
  const [inputToggle, setInputToggle] = useState("hidden");

  const inputElement = useRef(null);

  const addGuideHandler = () => {
    if (!username) {
      setError("Login to add Guides!");
      setTimeout(() => setError(), 3000);
    } else navigate("/guides/add");
  };

  //ref for input focus
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputToggle]);

  useEffect(() => {
    fetch(SERVER_URL + "/api/guides")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          errorNotification("Something went wrong!");
          return;
        }

        setGuides(data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        errorNotification("Something went wrong!");
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
      <div className={classes}>
        <p
          onClick={() => setInputText("")}
          className="mb-0 inline text-3xl tracking-tighter font-semibold"
        >
          Guides
        </p>
        <div className="flex sm:ml-auto items-center pr-4">
          <div className="search flex items-center">
            <Input
              className={inputToggle + " w-72"}
              type="text"
              value={inputText}
              ref={inputElement}
              onChange={inputHandler}
              autoFocus
              variant="filled"
              placeholder="Search Guide"
            />
            {inputToggle === "hidden" && (
              <div className=" hover:cursor-pointer" onClick={toggleSearch}>
                <AiOutlineSearch className="w-6 h-6" />
              </div>
            )}

            {inputToggle === "flex" && (
              <div className="pl-2 hover:cursor-pointer" onClick={toggleClose}>
                <AiOutlineClose className="w-6 h-6" />
              </div>
            )}
          </div>
          <div onClick={addGuideHandler} className="ml-2 hover:pointer">
            <AiOutlinePlus className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {error ? (
          <p>Can't connect to the server</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          filterData(guides)?.map((item) => (
            <GuideElement data={item} updateData={setGuides} />
          ))
        )}
      </div>
    </div>
  );
};

export default Guides;
