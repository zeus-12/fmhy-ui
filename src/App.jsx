import { useState } from "react";
import { UserContext } from "./context/UserContext";
import "./index.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Wiki from "./pages/Wiki";
import Home from "./pages/Home";
import About from "./pages/About";
import Error404 from "./pages/404";
import Guides from "./pages/Guides";
import AddGuide from "./pages/AddGuide";
import Login from "./pages/Login";
import User from "./pages/User";
import EditGuide from "./pages/EditGuide";
import React from "react";
import SubmitLink from "./pages/SubmitLink";
import LinksItem from "./pages/LinksItem";
import Links from "./pages/Links";
import LinkQueue from "./pages/LinkQueue";
import Search from "./pages/Search";
import { MantineProvider } from "@mantine/core";
import Base64 from "./pages/Base64";

function App() {
  // const token = localStorage.getItem("token");
  // if (token) {
  // 	let user = jwt.decode(token);
  // 	if (user) {
  // 		var initialUsername = user.username;
  // 		var initialIsAdmin = user.admin;
  // 	}
  // }
  // var initialUsername = "";
  var initialIsAdmin = false;

  const [username, setUsername] = useState("");
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
              <Route path="/resource/:resource" element={<Wiki />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/guides/add"
                element={username ? <AddGuide /> : <Navigate to="/guides" />}
              />
              <Route path="/guides/edit/:ID" element={<EditGuide />} />
              <Route path="/guides" element={<Guides />} />
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/user" element={<User />} /> */}
              <Route path="/links" element={<Links />} />
              <Route path="/links/:CATEGORY" element={<LinksItem />} />

              <Route path="/base64" element={<Base64 />} />

              <Route path="/submit-link" element={<SubmitLink />} />
              <Route path="/links/add" element={<SubmitLink />} />

              <Route path="/link-queue" element={<LinkQueue />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
