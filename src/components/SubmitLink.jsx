import { useEffect, useState, useContext } from "react";
import "../styles/AddGuide.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { formatName } from "../lib/helper";
import { category_channels } from "../lib/CONSTANTS";
import { ErrorNotification, SuccessNotification } from "./Notification";
import { Button, Select } from "@mantine/core";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

const SubmitLink = () => {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!username) {
      setError("Login inorder to submit Links!");
      setTimeout(() => {
        setError("");
        navigate("/");
      }, 3000);
    }
  }, []);

  async function linkHandler(event) {
    event.preventDefault();

    const data = await fetch(SERVER_URL + "/api/link-queue", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        link,
        description,
        category,
        channel,
      }),
    });
    const { message } = await data.json();

    if (data.status === 200) {
      setSuccess(message);
      setTimeout(() => {
        setSuccess("");
        navigate("/link-queue");
      }, 1500);
    } else {
      setError(message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  return (
    <div className="p- flex flex-col items-center">
      {error && <ErrorNotification error={error} />}
      {success && <SuccessNotification success={success} />}

      <h1 className="login-header mt-2">
        <span className="text-[#E78EA9]">Submit </span>Links
      </h1>
      <div>
        <div className="user-box ">
          <input
            className="input-text"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
          <label className="">Title</label>
        </div>
        <div className="user-box ">
          <input
            className="input-text"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required={true}
          />
          <label className="">Link</label>
        </div>
        <div className="user-box ">
          <input
            className="input-text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            required={true}
          />
          <label className="">Description (Notes)</label>
        </div>

        <Select
          label="Category"
          placeholder="Select Category"
          value={category}
          onChange={setCategory}
          data={category_channels.map((item) => ({
            value: item.category,
            label: formatName(item.category),
          }))}
        />

        {category && (
          <Select
            label="Channel"
            placeholder="Select Channel"
            value={channel}
            onChange={setChannel}
            data={
              category &&
              category_channels.find((item) => item.category === category) &&
              category_channels
                .find((item) => item.category === category)
                .channels.map((channel) => ({
                  value: channel,
                  label: formatName(channel),
                }))
            }
          />
        )}

        <Button
          onClick={linkHandler}
          variant="outline"
          color={"blue"}
          className="mt-4"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SubmitLink;
