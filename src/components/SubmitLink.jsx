import { useEffect, useState, useContext } from "react";
import "../styles/AddGuide.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { formatName } from "../lib/helper";
import { category_channels } from "../lib/CONSTANTS";
import { ErrorNotification, SuccessNotification } from "./Notification";

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

    const data = await fetch(SERVER_URL + "/api/submit-links", {
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
        <form
          className="login-form"
          onSubmit={linkHandler}
          //also show a message saying link added
        >
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
          <select
            className="form-select p-0 ps-1 rounded-sm mb-1 bg-[#60001f] border-gray-900"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={null}>Select Category</option>

            {category_channels.map((item, index) => (
              <option key={index} value={item.category}>
                {formatName(item.category)}
              </option>
            ))}
          </select>
          {category && (
            <select
              className="form-select rounded-sm p-0 ps-1 mb-2 bg-[#60001f] border-gray-900"
              name="channel"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            >
              <option value={null}>Select Channel</option>
              {category &&
                category_channels.find((item) => item.category === category) &&
                category_channels
                  .find((item) => item.category === category)
                  .channels.map((channel, index) => (
                    <option key={index} value={channel}>
                      {formatName(channel)}
                    </option>
                  ))}
            </select>
          )}

          <input
            className="block py-2 submit-btn"
            value="Submit"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default SubmitLink;
