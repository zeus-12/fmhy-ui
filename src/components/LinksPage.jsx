import { Link } from "react-router-dom";
import "../styles/AddGuide.css";
import { formatName } from "../lib/helper";
import { category_channels } from "../lib/CONSTANTS";
import { Button } from "@mantine/core";

const LinksPage = () => {
	let sortedCateogryChannels = category_channels.sort(
		(a, b) => a.channels.length < b.channels.length,
	);
	// let sortedCateogryChannels = sortedCateogry.map((ele) =>
	// 	ele.channels.sort((a, b) => a > b),
	// );
	// console.log(sortedCateogryChannels);

	return (
		<div className="">
			<div className="flex justify-between items-center">
				<p
					className="p-2 ps-4 mb-0"
					style={{ fontSize: "1.6rem", color: "rgb(255, 180, 180)" }}
				>
					Links
				</p>
				<Link to="/submit-link">
					<Button className="bg-yellow-700 hover:bg-yellow-600">
						Submit Link
					</Button>
				</Link>
			</div>
			<div className="flex flex-wrap justify-center">
				{sortedCateogryChannels.map((item, index) => (
					<Link
						to={item.category.split(" ")[0]}
						className="m-1 col-11 col-md-5 col-xl-3 guide-item"
						style={{
							borderRadius: "10px",
							backgroundColor: "rgb(17, 16, 16)",
							border: "0.1px solid rgb(91, 91, 91)",
						}}
						key={index}
					>
						<div className="text-light p-2">
							<h1 className="mb-0" style={{ color: "rgb(224, 250, 241)" }}>
								{formatName(item.category)}
							</h1>
							<div className="flex flex-column flex-wrap link-page-item ">
								{item.channels.map((channel) => (
									<p
										className="d-inline mb-0"
										style={{
											fontSize: "0.85rem",
											color: "rgba(226, 226, 226, 0.91)",
										}}
									>
										{formatName(channel)}
									</p>
								))}
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default LinksPage;
