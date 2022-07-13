import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

import { UserContext } from "./UserContext";
import SERVER_URL from "../ServerUrl";

const Login = () => {
	const navigate = useNavigate();
	const { username, setUsername, setIsAdmin } = useContext(UserContext);

	const [user_name, setUser_name] = useState("");
	const [password, setPassword] = useState("");

	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (username) {
			navigate("/user");
		}
	}, [username]);

	async function userHandler(event) {
		event.preventDefault();

		const response = await fetch(SERVER_URL + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user_name, password }),
		});
		const data = await response.json();
		if (data.user) {
			localStorage.setItem("token", data.user);
			setUsername(data.username);
			setIsAdmin(data.admin);
			navigate("/user");
		} else {
			setErrorMessage("Incorrect combination");
		}
	}

	return (
		<div className="p-2 flex flex-column align-items-center">
			<div>
				<h1 className="pb-2 login-header" style={{ color: "#B9F8D3" }}>
					Login
				</h1>
				<form className="login-form " onSubmit={userHandler}>
					<div className="user-box ">
						<input
							className="input-text"
							id="username"
							type="text"
							value={user_name}
							onChange={(e) => setUser_name(e.target.value)}
							required={true}
						/>
						<label>Username</label>
					</div>
					<div className="user-box">
						<input
							className="input-text"
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required={true}
						/>
						<label>Password</label>
					</div>
					<p className="mt-0 mb-2 text-danger">{errorMessage}</p>
					<input
						className="d-block py-2 submit-btn"
						value="Submit"
						type="submit"
					/>
				</form>
			</div>
		</div>
	);
};

export default Login;
