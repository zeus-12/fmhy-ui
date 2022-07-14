import { Link } from "react-router-dom";
import "../styles/resourcesMenu.css";
import { resources } from "../lib/CONSTANTS";

const ResourcesMenu = () => {
	return (
		<div>
			<div className="flex justify-between align-items-center">
				<h1 className="p-2 ps-4">Resources</h1>
				<p className="pe-4 p-2" style={{ color: "rgb(156 163 175)" }}>
					Fetched from Megathread!
				</p>
			</div>
			<div className="flex justify-center flex-wrap">
				{resources.map((resource, index) => (
					<Link to={resource.link} key={index}>
						<div
							className="resource-box flex-col p-2 m-2 flex justify-center items-center"
							style={{
								borderRadius: "5px",
								width: "18vw",
								height: "18vw",
								fontSize: "1.2rem",
							}}
						>
							<p>{resource.emoji}</p>
							<p>{resource.title}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ResourcesMenu;
