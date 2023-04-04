import { useState } from "react";
import { UserContext } from "./context/UserContext";
import "./index.css";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Error404 from "./pages/404";
import Guides from "./pages/Guides";
import AddGuide from "./pages/AddGuide";
import EditGuide from "./pages/EditGuide";

// import Wiki from "./pages/Wiki";
// import Login from "./pages/Login";
// import User from "./pages/User";
// import SubmitLink from "./pages/SubmitLink";
// import LinkQueue from "./pages/LinkQueue";
import Links from "./pages/Links";
import Search from "./pages/Search";
import {
  Badge,
  Group,
  MantineProvider,
  Text,
  UnstyledButton,
} from "@mantine/core";
import Base64 from "./pages/Base64";
import OldLinks from "./pages/OldLinks";
import OldLinksItem from "./pages/OldLinksItem";
import { Notifications } from "@mantine/notifications";
import { SpotlightProvider } from "@mantine/spotlight";
import { AiOutlineSearch } from "react-icons/ai";

function App() {
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const spotlightActions = [
    {
      title: query ? query : "Search on Streamlit",
      description: "Search for it on the Streamlit",

      onTrigger: () => {
        const q = query.replace(" ", "+");
        window.open(`https://fmhy-search.streamlit.app/?q=${q}`);
      },
    },
    {
      title: query ? query : "Search on Db",
      description: "Search for it on the Db",
      onTrigger: () => {
        navigate(`/search?q=${query}`);
      },
    },
    {
      title: "Links Page",
      description: "Collection of all links scraped from FMHY Github ",
      new: true,
      onTrigger: () => {
        navigate("/links");
      },
    },
    {
      title: "Guides Page",
      description: "Collection of useful Guides!",
      onTrigger: () => {
        navigate("/guides");
      },
    },
    {
      title: "Base64 links",
      description: "All base64 links in r/fmhy",
      onTrigger: () => {
        navigate("/base64");
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

              {/* <Route path="/resource/:resource" element={<Wiki />} /> */}

              <Route path="/old-links" element={<OldLinks />} />
              <Route path="/old-links/:CATEGORY" element={<OldLinksItem />} />

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

              <Route path="/links" element={<Navigate to="/links/home" />} />
              <Route path="/links/:CATEGORY" element={<Links />} />

              <Route path="/base64" element={<Base64 />} />

              {/* <Route path="/submit-link" element={<SubmitLink />} /> */}
              {/* <Route path="/links/add" element={<SubmitLink />} /> */}
              {/* <Route path="/link-queue" element={<LinkQueue />} /> */}

              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </SpotlightProvider>
    </MantineProvider>
  );
}

export default App;

function CustomAction({
  action,
  styles,
  classNames,
  hovered,
  onTrigger,
  ...others
}) {
  return (
    <UnstyledButton
      className="w-full p-3 hover:bg-[#16181E] active:bg-red-500"
      data-hovered={hovered || undefined}
      tabIndex={-1}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onTrigger}
      {...others}
    >
      <Group noWrap>
        <div style={{ flex: 1 }}>
          <Text>{action.title}</Text>

          {action.description && (
            <Text color="dimmed" size="xs">
              {action.description}
            </Text>
          )}
        </div>

        {action.new && <Badge>new</Badge>}
      </Group>
    </UnstyledButton>
  );
}
