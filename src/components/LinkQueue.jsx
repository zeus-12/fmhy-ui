import { useEffect, useState, useContext } from "react";
import SERVER_URL from "../ServerUrl";
import { UserContext } from "./UserContext";

import "../styles/AddGuide.css";
import LinkQueueModel from "./LinkQueueModal";

const LinkQueue = () => {
	const { isAdmin } = useContext(UserContext);
	// const isAdmin = true;
	const [isOpen, setIsOpen] = useState(false);
	const [idToEdit, setIdToEdit] = useState();
	const [submittedLinks, setSubmittedLinks] = useState([]);

	const [response, setResponse] = useState("");
	const [responseClass, setResponseClass] = useState("");

	const modalHandler = async (e, id) => {
		setIdToEdit(e.target.id);
		setIsOpen(true);
	};
	const deleteLink = async (e, id) => {
		if (id) {
			var idToDelete = id;
		} else {
			var idToDelete = e.target.id;
		}

		const req = await fetch(
			SERVER_URL + "/api/link-queue/delete/" + idToDelete,
			{
				method: "DELETE",
				headers: { "x-access-token": localStorage.getItem("token") },
			},
		);
		const data = await req.json();
		if (data.status === "ok") {
			setSubmittedLinks((prevData) =>
				prevData.filter((link) => link._id !== data.deletedSubmittedLink._id),
			);
		}
	};
	useEffect(() => {
		const fetchLinks = async () => {
			const req = await fetch(SERVER_URL + "/api/submit-links/all");
			let data = await req.json();
			setSubmittedLinks(data.data);
		};

		fetchLinks();
	}, []);
	return (
		<div className="p-2">
			<h4 className="mb-0">Link Queue</h4>
			<div>
				{submittedLinks?.map((link) => {
					return (
						<div
							className="mb-3 p-2 d-inline-block me-2 guide-item"
							style={{ borderRadius: "5px", verticalAlign: "top" }}
							key={link._id}
						>
							{/* title */}

							<p className="m-0" style={{ color: "#5BA9E7" }}>
								{link.title}
							</p>

							{/* descritpion */}
							{link.description && <p className="m-0">{link.description}</p>}

							{/* link */}
							<a href={link.link}>{link.link}</a>

							{/* username */}
							<p className="m-0">
								🙏
								<span
									className="px-2 py-1"
									style={{
										borderRadius: "2rem",
										backgroundColor: "#aec5e8",
										color: "black",
									}}
								>
									{link.username}
								</span>
							</p>
							<div className="flex pt-2">
								{/* category */}
								{link.category && (
									<p className="m-0 tag me-2">{link.category}</p>
								)}

								{/* channel */}
								{link.channel && <p className="m-0 tag">{link.channel}</p>}
							</div>
							{/* delete and edit icon	 */}
							{isAdmin && (
								// add a tick svg inside to add it to the selected channel
								<div className="flex me-2">
									{/* edit */}
									{/* uncomment for edit */}
									<svg
										id={link._id}
										onClick={modalHandler}
										width="24"
										height="24"
										stroke="grey"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											id={link._id}
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
										></path>
									</svg>

									{/* delete */}

									<svg
										id={link._id}
										onClick={deleteLink}
										width="24"
										height="24"
										stroke="grey"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											id={link._id}
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										></path>
									</svg>
								</div>
							)}
						</div>
					);
				})}
			</div>
			{/* modal */}
			{isOpen && (
				<LinkQueueModel
					idToEdit={idToEdit}
					setIsOpen={setIsOpen}
					deleteLink={deleteLink}
					submittedLinks={submittedLinks}
					setSubmittedLinks={setSubmittedLinks}
				/>
			)}

			{/* resp message */}
			<div className="flex justify-center">
				{response && (
					<div
						style={{
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
		</div>
	);
};

export default LinkQueue;
