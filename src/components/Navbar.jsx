import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { Burger, Button, Drawer, Menu } from "@mantine/core";
import { Link } from "react-router-dom";
import { resources as menuItems } from "../lib/CONSTANTS";

const navItems = [
	{ link: "/links", name: "Links" },
	{ link: "/about", name: "About" },
	{ link: "/guides", name: "Guides" },
	{ link: "/link-queue", name: "Link Queue" },
];

export const MenuComponents = () => (
	<Menu
		menuButtonLabel="Resources"
		control={
			<p className="px-1 py-1 text-2xl md:text-lg  text-gray-300 rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900">
				Wiki
			</p>
		}
	>
		{menuItems.map((item, index) => (
			<Link key={index} to={item.link}>
				<Menu.Item icon={item.emoji}>{item.title}</Menu.Item>
			</Link>
		))}
	</Menu>
);

export const LinkElements = () => (
	<>
		{navItems.map((item, index) => (
			<Link key={index} to={item.link}>
				<p className="px-0.5 py-1 lg:px-2 text-2xl md:text-lg  text-gray-300 rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900">
					{item.name}
				</p>
			</Link>
		))}
	</>
);

const Navbar = () => {
	const { username } = useContext(UserContext);
	const [opened, setOpened] = useState(false);
	const title = opened ? "Close navigation" : "Open navigation";

	const Logo = (
		<Link to="/">
			<div className="flex gap-2 items-center">
				<img
					style={{ borderRadius: "16px" }}
					src="../../assets/logo.png"
					alt="logo"
					width="35px"
				/>
				<p className="font-medium font-sans text-2xl md:text-lg  hidden md:inline">
					FMHY
				</p>
			</div>
		</Link>
	);

	const burgerComponent = (
		<Burger
			color="cyan"
			opened={opened}
			onClick={() => setOpened((o) => !o)}
			title={title}
		/>
	);

	const NavbarDrawer = (
		<div>
			<Drawer
				className="pt-4 px-2 bg-black"
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
					<div
						className="flex justify-center"
						onClick={(e) => e.stopPropagation()}
					>
						<MenuComponents />
					</div>
					{/* <Link to="/resources" onClick={(e) => e.stopPropagation()}>
						<p className="px-1 py-1 text-2xl md:text-lg  text-gray-300 rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900">
							Wiki
						</p>
					</Link> */}
					{/* <div className=""> */}
					<LinkElements />
					{username && (
						<Link to="/user">
							<p className="px-0.5 py-1 lg:px-2 text-2xl md:text-lg  text-gray-300 rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900">
								User
							</p>
						</Link>
					)}
					{!username && (
						<Link to="/login">
							<p className="px-0.5 py-1 lg:px-2 text-2xl md:text-lg  text-gray-300 rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900">
								Login
							</p>
						</Link>
					)}
					{/* </div> */}
				</div>
			</Drawer>
		</div>
	);

	return (
		<>
			<div>
				<div className="px-6 border-b-[1px] border-gray-800 w-screen h-16 bg-black fixed top-0 flex justify-between items-center z-50 ">
					{Logo}
					<Link to="/">
						<p className="text-white font-medium font-sans text-2xl md:text-lg  md:hidden">
							FMHY
						</p>
					</Link>
					<div className="md:hidden">{burgerComponent}</div>
					{opened && <div className="hidden md:flex">{burgerComponent}</div>}
					{!opened && (
						<div className="text-gray-300 text-lg font-medium hidden xl:gap-8 md:flex gap-8">
							<MenuComponents />
							<LinkElements />
							{username && (
								<Link to="/user">
									<p className="px-0.5 py-1 lg:px-2 text-2xl md:text-lg  text-gray-300 rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900">
										User
									</p>
								</Link>
							)}
							{!username && (
								<Link to="/login">
									<p className="px-0.5 py-1 lg:px-2 text-2xl md:text-lg  text-gray-300 rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900">
										Login
									</p>
								</Link>
							)}
						</div>
					)}
				</div>

				<div className="">{NavbarDrawer}</div>
			</div>
		</>
	);
};

export default Navbar;
