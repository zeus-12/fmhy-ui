import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { ErrorNotification } from "./Notification";
import { UserContext } from "./UserContext";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const Login = () => {
	const navigate = useNavigate();
	const { username, setUsername, setIsAdmin } = useContext(UserContext);

	const [user_name, setUser_name] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState(null);

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
			setError("Incorrect combination");
			setTimeout(() => {
				setError("");
			}, 3000);
		}
	}

	return (
		<div className="p-2 flex flex-col items-center">
			{error && <ErrorNotification error={error} />}
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

export default Login;
