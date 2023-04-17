import { useState } from "react";
import { UserContext } from "./context/UserContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Error404 from "./pages/404";
import Guides from "./pages/guide/Guides";
import AddGuide from "./pages/guide/AddGuide";
import EditGuide from "./pages/guide/EditGuide";

// import Wiki from "./pages/Wiki";
// import Login from "./pages/Login";
// import User from "./pages/User";
// import SubmitLink from "./pages/SubmitLink";
// import LinkQueue from "./pages/LinkQueue";

import Links from "./pages/links/Links";
import Wiki from "./pages/links/Wiki";
import Base64 from "./pages/links/Base64";

import Search from "./pages/Search";
import {
  Badge,
  Group,
  MantineProvider,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SpotlightProvider } from "@mantine/spotlight";
import { AiOutlineSearch } from "react-icons/ai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const spotlightActions = [
    {
      title: "Wiki",
      description: "Collection of all links scraped from FMHY Github ",
      group: "page",
      new: true,
      onTrigger: () => {
        navigate("/wiki");
      },
    },
    {
      title: "Guides",
      description: "Collection of useful Guides!",
      group: "page",

      onTrigger: () => {
        navigate("/guides");
      },
    },
    {
      title: "Base64 Links",
      description: "All base64 links in r/fmhy",
      group: "page",
      onTrigger: () => {
        navigate("/base64");
      },
    },
    {
      title: query,
      description: "Search on Streamlit",
      isSearch: true,
      source: "Streamlit",
      group: "search",

      onTrigger: () => {
        const q = query.replace(" ", "+");
        window.open(`https://fmhy-search.streamlit.app/?q=${q}`);
      },
    },
    {
      title: query,
      isSearch: true,
      source: "DB",
      group: "search",
      description: "Search on Db",
      onTrigger: () => {
        navigate(`/search?q=${query}`);
      },
    },
  ];

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
      <QueryClientProvider client={queryClient}>
        <SpotlightProvider
          shortcut={["mod + P", "mod + K", "/"]}
          actions={spotlightActions}
          actionComponent={CustomAction}
          searchPlaceholder="Search..."
          query={query}
          onQueryChange={setQuery}
          searchIcon={<AiOutlineSearch className="w-5 h-5 text-gray-400" />}
        >
          <UserContext.Provider
            value={{ username, setUsername, isAdmin, setIsAdmin }}
          >
            <Notifications />

            <Navbar />
            <div className="mt-20 px-2">
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/links/:resource" element={<Links />} />

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

                <Route path="/wiki" element={<Navigate to="/wiki/home" />} />
                <Route path="/wiki/:CATEGORY" element={<Wiki />} />

                <Route path="/base64" element={<Base64 />} />

                {/* <Route path="/submit-link" element={<SubmitLink />} /> */}
                {/* <Route path="/links/add" element={<SubmitLink />} /> */}
                {/* <Route path="/link-queue" element={<LinkQueue />} /> */}

                <Route path="*" element={<Error404 />} />
              </Routes>
            </div>
          </UserContext.Provider>
        </SpotlightProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;

const useStyles = createStyles((theme) => ({
  action: {
    borderRadius: theme.radius.sm,
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[1],
    }),

    "&[data-hovered]": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[1],
    },
  },
}));

function CustomAction({
  action,
  styles,
  classNames,
  hovered,
  onTrigger,
  ...others
}) {
  const { classes } = useStyles(null, {
    styles,
    classNames,
    name: "Spotlight",
  });

  return (
    <UnstyledButton
      className={`w-full px-3 py-2 mt-1 ${classes.action}`}
      data-hovered={hovered || undefined}
      tabIndex={-1}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onTrigger}
      {...others}
    >
      <Group noWrap>
        <div style={{ flex: 1 }}>
          <div className="flex items-center gap-4">
            {action.isSearch ? (
              <p>
                Search {action.title && "for "}
                {action.title && (
                  <span className="font-bold"> {action.title}</span>
                )}
              </p>
            ) : (
              <p className="text-lg">{action.title}</p>
            )}
            {action.isSearch && (
              <div
                size="md"
                className="text-blue-300 bg-[#1D2C40] uppercase font-semibold text-xs rounded-lg px-3 py-1"
              >
                {action.source}
              </div>
            )}
          </div>
          <p className="text-gray-500 text-sm">{action.description}</p>
        </div>

        {action.new && <Badge>new</Badge>}
      </Group>
    </UnstyledButton>
  );
}
