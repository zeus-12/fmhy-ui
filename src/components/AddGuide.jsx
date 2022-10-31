import { useState, useContext, useEffect } from "react";
import "../styles/AddGuide.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Tags from "./Tags";
import { ErrorNotification, SuccessNotification } from "./Notification";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";
const AddGuide = () => {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [nsfw, setNsfw] = useState("");
  const [credits, setCredits] = useState("");

  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!username) {
      setError("Login inorder to add Guides!");
      setTimeout(() => {
        setError("");
        navigate("/guides");
      }, 1500);
    }
  }, [username]);

  async function guideHandler(event) {
    event.preventDefault();

    const data = await fetch(SERVER_URL + "/api/guides/new", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, link, nsfw, username, tags, credits }),
    });
    // const data = await response.json();

    if (data.status === 200) {
      setSuccess("Guide Added!");
      setTimeout(() => {
        setSuccess("");
        navigate("/guides");
      }, 1500);
    } else {
      setError("Guide already exist!");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  return (
    <div className="flex flex-col items-center">
      {error && <ErrorNotification error={error} />}
      {success && <SuccessNotification success={success} />}
      <h1 className="login-header mt-2">
        Add <span style={{ color: "#E78EA9" }}>Guide</span>
      </h1>
      <div>
        <form className="login-form" onSubmit={guideHandler}>
          <div className="user-box ">
            <input
              className="input-text"
              id="guideName"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
            <label>Guide Title</label>
          </div>
          <div className="user-box">
            <input
              className="input-text"
              id="guideLink"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required={true}
            />
            <label>Guide Link</label>
          </div>
          <div className="user-box ">
            <input
              className="input-text"
              id="credits"
              type="text"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
            />
            <label>Credits</label>
          </div>
          <Tags tags={tags} setTags={setTags} setError={setError} />
          <div className="flex justify-start items-center">
            <input
              className="mr-1"
              type="checkbox"
              name="nsfw"
              value={nsfw}
              onChange={(e) => setNsfw(e.target.checked)}
            />{" "}
            NSFW
          </div>
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

export default AddGuide;
