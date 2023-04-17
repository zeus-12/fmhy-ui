import React, { useState, useEffect, useRef } from "react";
import GuideItem from "../../components/GuideItem";
import { Input, Loader } from "@mantine/core";
import { SERVER_URL } from "../../lib/config";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { notSignedInNotification } from "../../components/Notifications";

const Guides = () => {
  const [inputText, setInputText] = useState("");
  const [showInput, setShowInput] = useState(false);

  const inputElement = useRef(null);

  const addGuideHandler = () => {
    // if (!username) {
    notSignedInNotification("You need to be signed in to add a guide!");
    // } else navigate("/guides/add");
  };

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [showInput]);

  const {
    data: guides,
    error,
    isLoading,
  } = useQuery(["guides"], () =>
    fetch(SERVER_URL + "/api/guides")
      .then((res) => res.json())
      .then((data) => data.data)
  );

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

  return (
    <div className="p-4 pt-0">
      <div
        className={`justify-between flex sm:flex-row ${
          showInput ? "flex-col" : ""
        }`}
      >
        <p
          onClick={() => setInputText("")}
          className="mb-0 inline text-3xl tracking-tighter font-semibold"
        >
          Guides
        </p>
        <div className="flex sm:ml-auto items-center pr-4 gap-2">
          <div className="search flex items-center gap-2">
            {showInput ? (
              <>
                <Input
                  className="flex w-72"
                  type="text"
                  value={inputText}
                  ref={inputElement}
                  onChange={inputHandler}
                  autoFocus
                  variant="filled"
                  placeholder="Search Guide"
                />
                <div
                  className="hover:cursor-pointer"
                  onClick={() => setShowInput(false)}
                >
                  <AiOutlineClose className="w-6 h-6" />
                </div>
              </>
            ) : (
              <div
                className="hover:cursor-pointer"
                onClick={() => setShowInput(true)}
              >
                <AiOutlineSearch className="w-6 h-6" />
              </div>
            )}
          </div>
          <div onClick={addGuideHandler} className="hover:cursor-pointer">
            <AiOutlinePlus className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {error ? (
          <p>Can't connect to the server</p>
        ) : isLoading ? (
          <div className="justify-center items-center flex h-[calc(100vh_-_6rem)]">
            <Loader variant="dots" />
          </div>
        ) : (
          filterData(guides)?.map((item) => <GuideItem data={item} />)
        )}
      </div>
    </div>
  );
};

export default Guides;
