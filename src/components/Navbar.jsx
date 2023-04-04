import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Burger, Drawer, Menu } from "@mantine/core";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const LinkElements = ({ username }) => {
  const navItems = [
    { link: "/links", name: "Links" },
    { link: "/search", name: "Search" },
    { link: "/about", name: "About" },
    { link: "/guides", name: "Guides" },
    // { link: username?"/user":"/login", name: username?"User":"Login" },
  ];

  const location = useLocation();
  const curLink = location.pathname;

  return (
    <>
      {navItems.map((item, index) => (
        <Link key={index} to={item.link}>
          <p
            className={`px-0.5 py-1 lg:px-2 text-2xl md:text-lg rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900 ${
              curLink.startsWith(item.link) ? "text-white" : "text-gray-500"
            }`}
          >
            {item.name}
          </p>
        </Link>
      ))}
    </>
  );
};

export const Logo = () => (
  <Link to="/">
    <div className="flex gap-2 items-center">
      <img src="../../assets/logo.png" alt="logo" width="35px" />
      <p className="font-semibold tracking-tight text-gray-200 font-sans text-2xl md:text-lg  hidden md:inline">
        FMHY
      </p>
    </div>
  </Link>
);

export const NavbarDrawer = ({ opened, setOpened, username }) => (
  <div className={opened ? "pt-4 px-2" : ""}>
    <Drawer
      className="bg-black"
      opened={opened}
      position="top"
      size="100vh"
      onClick={() => setOpened(false)}
      onClose={() => setOpened(false)}
      overlayOpacity={0.55}
      overlayBlur={3}
      withCloseButton={false}
      zIndex={20}
    >
      <div className="text-2xl pt-16 space-y-4">
        {/* <div
          className="flex justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <MenuComponents setOpened={setOpened} />
        </div> */}

        <LinkElements />
      </div>
    </Drawer>
  </div>
);

export const BurgerComponent = ({ opened, setOpened, title }) => (
  <Burger
    color="cyan"
    opened={opened}
    onClick={() => setOpened((o) => !o)}
    title={title}
  />
);

const Navbar = () => {
  const { username } = useContext(UserContext);
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";

  return (
    <>
      <div>
        <div className="px-6 border-b-[1px] border-gray-800 w-screen h-16 bg-black fixed top-0 flex justify-between items-center z-50 ">
          <Logo />
          <Link to="/">
            <p className="text-white font-medium font-sans text-2xl md:text-lg  md:hidden">
              FMHY
            </p>
          </Link>
          <div className="md:hidden">
            <BurgerComponent
              opened={opened}
              setOpened={setOpened}
              title={title}
            />
          </div>
          {opened && (
            <div className="hidden md:flex">
              <BurgerComponent
                opened={opened}
                setOpened={setOpened}
                title={title}
              />
            </div>
          )}
          {!opened && (
            <div className="text-gray-300 text-lg font-medium hidden xl:gap-8 md:flex gap-8">
              {/* <MenuComponents /> */}
              <LinkElements username={username} />
            </div>
          )}
        </div>

        <div>
          <NavbarDrawer
            username={username}
            opened={opened}
            setOpened={setOpened}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
