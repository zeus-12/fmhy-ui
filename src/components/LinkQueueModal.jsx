import { useEffect, useState, useContext } from "react";
import "../styles/AddGuide.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import SERVER_URL from "../ServerUrl";
import { formatName } from "../lib/helper";
import { category_channels } from "../lib/CONSTANTS";
import ReactDom from "react-dom";

const LinkQueueModel = ({
	idToEdit,
	setIsOpen,
	deleteLink,
	submittedLinks,
	setSubmittedLinks,
}) => {
	useEffect(async () => {
		if (!username) {
			setResponseClass("bg-danger");
			setResponse("Require admin access");
			setTimeout(() => {
				navigate("/link-queue");
			}, 1500);
		}
		const res = await fetch(SERVER_URL + "/api/submit-links/" + idToEdit, {
			headers: { "x-access-token": localStorage.getItem("token") },
		});
		const data = await res.json();
		const modalData = data.data;
		setTitle(modalData.title);
		setLink(modalData.link);
		setDescription(modalData.description);
		setCategory(modalData.category);
		setChannel(modalData.channel);
	}, [idToEdit]);

	const { username } = useContext(UserContext);
	const navigate = useNavigate();

	const [title, setTitle] = useState();
	const [link, setLink] = useState();
	const [description, setDescription] = useState();
	const [category, setCategory] = useState();
	const [channel, setChannel] = useState();
	const deleteInsideModal = () => {
		deleteLink(null, idToEdit);
		setIsOpen(false);
	};
	const [errorMessage, setErrorMessage] = useState("");
	const [response, setResponse] = useState("");
	const [responseClass, setResponseClass] = useState("");
	const overlayHandler = () => {
		setIsOpen(false);
	};
	async function linkHandler(event) {
		event.preventDefault();
		let updateData = {
			title,
			link,
			description,
			category,
			channel,
		};

		const data = await fetch(
			SERVER_URL + `/api/link-queue/update/${idToEdit}`,
			{
				method: "PUT",
				headers: {
					"x-access-token": localStorage.getItem("token"),
					"Content-Type": "application/json",
				},

				body: JSON.stringify(updateData),
			},
		);

		if (data.status === 200) {
			setErrorMessage("");
			setResponseClass("bg-success");
			setResponse("Link Updated!");
			setIsOpen(false);

			let entryToUpdate = submittedLinks.find((item) => item._id === idToEdit);

			let newSubmittedLinks = submittedLinks.filter(
				(item) => item._id !== idToEdit,
			);

			newSubmittedLinks = [
				...newSubmittedLinks,
				{ ...entryToUpdate, ...updateData },
			];
			setSubmittedLinks(newSubmittedLinks);
		} else {
			setResponse("Error");
			setResponseClass("bg-danger");
		}
	}

	return ReactDom.createPortal(
		<>
			{/* overlay */}
			<div
				onClick={overlayHandler}
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: "rgba(0, 0, 0, .8)",
					zIndex: 1000,
				}}
			></div>
			{/* modal */}
			<div
				style={{
					border: "0.5px solid gray",
					borderRadius: "5px",
					position: "fixed",
					top: "50%",
					left: "50%",
					transform: "translate(-50%,-50%)",
					zIndex: 1000,
				}}
				className="p- flex flex-column align-items-center p-4"
			>
				<h1 className="login-header mt-2">
					<span style={{ color: "#8ad6b0" }}>Move to </span>Links
				</h1>
				<div>
					<form className="login-form" onSubmit={linkHandler}>
						<div className="user-box ">
							<input
								className="input-text"
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required={true}
							/>
							<label className="">Title</label>
						</div>
						<div className="user-box ">
							<input
								className="input-text"
								type="text"
								value={link}
								onChange={(e) => setLink(e.target.value)}
								required={true}
							/>
							<label className="">Link</label>
						</div>
						<div className="user-box ">
							<input
								className="input-text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								type="text"
								required={true}
							/>
							<label className="">Description (Notes)</label>
						</div>
						<select
							className="form-select p-0 ps-1 mb-1"
							name="category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							// defaultValue={category   }
						>
							<option value={null}>Select Category</option>

							{category_channels.map((item) => (
								<option value={item.category}>
									{formatName(item.category)}
								</option>
							))}
						</select>
						{category && (
							<select
								className="form-select p-0 ps-1 mb-2"
								name="channel"
								value={channel}
								onChange={(e) => setChannel(e.target.value)}
							>
								<option value={null}>Select Channel</option>
								{category &&
									category_channels.find(
										(item) => item.category === category,
									) &&
									category_channels
										.find((item) => item.category === category)
										.channels.map((channel) => (
											<option value={channel}>{formatName(channel)}</option>
										))}
							</select>
						)}
						{/* <Tags
						tags={tags}
						setTags={setTags}
						setResponse={setResponse}
						setResponseClass={setResponseClass}
					/> */}
						<input
							className="block py-2 submit-btn"
							value="Update"
							type="submit"
						/>
						<button
							className="block py-2 submit-btn text-danger mt-1"
							onClick={deleteInsideModal}
						>
							Delete
						</button>
					</form>
				</div>
			</div>
			{/* error message */}
			<div className="flex justify-center">
				{response && (
					<div
						style={{
							zIndex: 1000,
							position: "fixed",
							bottom: "2vh",
							display: "flex",
							flex: 1,
							minWidth: "10rem",
							width: "20vw",
							padding: "0.25rem 0.5rem ",
							borderRadius: "5px",
							justifyContent: "center",
						}}
						className={responseClass}
					>
						{response}
					</div>
				)}
			</div>
		</>,
		document.getElementById("portal"),
	);
};

export default LinkQueueModel;
