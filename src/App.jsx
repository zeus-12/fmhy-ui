import { useState } from "react";
import { UserContext } from "./components/UserContext";
import "./App.css";
import "./index.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Resources from "./components/Resources";
import Home from "./components/Home";
import About from "./components/About";
import Backup from "./components/Backup";
import Error404 from "./components/Error404";
import Guides from "./components/Guides";
import AddGuide from "./components/AddGuide";
import Login from "./components/Login";
import User from "./components/User";
import EditGuide from "./components/EditGuide";
import React from "react";
// import jwt from "jsonwebtoken";
import SubmitLink from "./components/SubmitLink";
import Links from "./components/Links";
import LinksPage from "./components/LinksPage";
import LinkQueue from "./components/LinkQueue";
import { MantineProvider } from "@mantine/core";

function App() {
  // const token = localStorage.getItem("token");
  // if (token) {
  // 	let user = jwt.decode(token);
  // 	if (user) {
  // 		var initialUsername = user.username;
  // 		var initialIsAdmin = user.admin;
  // 	}
  // }
  var initialUsername = "";
  var initialIsAdmin = false;

  const [username, setUsername] = useState(initialUsername);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        dark: [
          "#d5d7e0",
          "#acaebf",
          "#8c8fa3",
          "#666980",
          "#4d4f66",
          "#34354a",
          "#2b2c3d",
          "#1d1e30",
          "#0c0d21",
          "#01010a",
        ],
      }}
    >
      <BrowserRouter>
        <UserContext.Provider
          value={{ username, setUsername, isAdmin, setIsAdmin }}
        >
          <Navbar />
          <div className="mt-16 p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resource/:resource" element={<Resources />} />
              <Route path="/backup" element={<Backup />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/guides/add"
                element={username ? <AddGuide /> : <Navigate to="/guides" />}
              />
              <Route path="/guides/edit/:ID" element={<EditGuide />} />
              <Route path="/guides" element={<Guides />} />
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/user" element={<User />} /> */}
              <Route path="/links" element={<LinksPage />} />
              <Route path="/links/:CATEGORY" element={<Links />} />

              <Route path="/submit-link" element={<SubmitLink />} />
              <Route path="/links/add" element={<SubmitLink />} />

              <Route path="/link-queue" element={<LinkQueue />} />
              <Route path="*" element={<Error404 />} />
              {/* add /chat ,/revolt , /divolt reroute to revolt invite link */}
            </Routes>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
