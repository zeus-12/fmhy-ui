import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { formatName } from "../lib/helper";
import "../styles/resources.css";
import Error404 from "./Error404";

const Resources = (props) => {
	const [resources, setResources] = useState("");
	const [error, setError] = useState(false);

	let { resource } = useParams();

	if (props.resourceName) {
		resource = props.resourceName;
	}
	useEffect(() => {
		setResources("Loading...");
		const url = `https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/${resource}.json`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => data.data.content_md)
			// .then((data) =>
			// 	data
			// 		.replaceAll("&gt;", ">")
			// 		.replaceAll("&lt;", "<")
			// 		.replaceAll("<hr />", "")
			// 		.replaceAll("►", " ")
			// 		.replaceAll("▷", "")
			// 		.replaceAll("&#39;", "%")
			// 		.replaceAll("&amp;", "&"),
			// )
			.then((prev) => prev.substring(prev.indexOf("# ►")))

			.then((finalData) => setResources(finalData))
			.catch((error) => {
				setError(true);
			});
	}, [resource]);

	return (
		<div className="resources p-4 pt-0">
			{error && <Error404 />}
			<p className="text-capitalize mb-0" style={{ fontSize: "2rem" }}>
				{error || formatName(resource)}
			</p>
			<ReactMarkdown>{resources}</ReactMarkdown>
		</div>
	);
};

export default Resources;
