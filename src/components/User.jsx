import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken";
import GuideItemsGenerator from "./GuideItemsGenerator";
import "../styles/User.css";
import { UserContext } from "./UserContext";
import SERVER_URL from "../ServerUrl";

const User = () => {
	const { username, setUsername, setIsAdmin } = useContext(UserContext);

	const logout = () => {
		setUsername();
		setIsAdmin(false);
		localStorage.clear();
		navigate("/");
	};

	const [guidesAdded, setGuidesAdded] = useState("");
	let user;
	const navigate = useNavigate();

	function populateGuides() {
		fetch(SERVER_URL + "/api/guides/user", {
			headers: { "x-access-token": localStorage.getItem("token") },
		})
			.then((res) => res.json())
			.then((data) => setGuidesAdded(data.data))
			.catch((err) => console.log(err));
	}
	useEffect(() => {
		if (!username) {
			navigate("/login");
		}
	}, [username]);

	// useEffect(() => {
	// 	const token = localStorage.getItem("token");
	// 	if (token) {
	// 		user = jwt.decode(token);
	// 		if (!user) {
	// 			localStorage.removeItem("token");
	// 			navigate("/login");
	// 		} else {
	// 			setUsername(user.username);
	// 			setIsAdmin(user.admin);
	// 			populateGuides();
	// 		}
	// 	} else {
	// 		navigate("/login");
	// 	}
	// }, []);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h2 className="m-0" style={{ fontSize: "1.9rem" }}>
					Hey, <span className="text-cyan-400">{username || "User"}</span>
				</h2>
				<div className="logout px-2 py-2" onClick={logout}>
					<span className="logoout-btn">Logout</span>
				</div>
			</div>

			<h6 className="m-0 mt-4" style={{ fontSize: "1.45rem" }}>
				Guides Added
			</h6>
			<ul>
				<GuideItemsGenerator
					data={guidesAdded}
					updateData={setGuidesAdded}
					noResultMessage="None"
				/>
			</ul>
		</div>
	);
};

export default User;
