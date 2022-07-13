import React from "react";

const Backup = () => {
	const resources_backup_links = [
		{
			name: "Saidit",
			link: "https://saidit.net/s/freemediaheckyeah/wiki/index",
			frequency: "Daily",
		},
		{
			name: "Github",
			link: "https://github.com/nbats/FMHY/wiki/FREEMEDIAHECKYEAH",
			frequency: "Daily",
		},
		{ name: "Rentry", link: "https://rentry.co/FMHY", frequency: "Daily" },
		{
			name: "NotABug",
			link: "https://notabug.org/nbatman/freemediaheckyeah/wiki/_pages",
			frequency: "Daily",
		},
		{
			name: "Web Archive",
			link: "https://web.archive.org/web/20211218000000*/https://www.reddit.com/r/FREEMEDIAHECKYEAH/",
			frequency: "Periodically",
		},
		{
			name: "Disroot (Password: FMHY)",
			link: "https://bin.disroot.org/?afb37f030fe77ed8#9PJEnnb8qKd4VExxU3su5kSjcHpsVUP9CqkZ8AjrZasa",
			frequency: NaN,
		},
	];
	const server_backup_links = [
		{
			name: "Discord",
			link: "https://mega.nz/folder/cRRCQSrb#cT9Pkauyena6IWBt7zYZJw",
			frequency: "Daily",
		},
		{
			name: "Guilded",
			link: "https://www.guilded.gg/i/1EqadvqE",
			frequency: NaN,
		},
		{
			name: "Revolt",
			link: "https://app.revolt.chat/invite/YzV4Fmdt",
			frequency: NaN,
		},
	];

	const links_to_component = (links) => {
		const component = links.map((item) => (
			<li>
				<a className="d-block" style={{ color: "" }} href={item.link}>
					{item.name}
				</a>
			</li>
		));
		return component;
	};

	const resources_backup = links_to_component(resources_backup_links);
	const server_backup = links_to_component(server_backup_links);

	return (
		<div className="pt-4">
			<p style={{ fontSize: "1.5rem", color: "#47C072" }} className="mb-2">
				Backups
			</p>
			<div className="mb-4 md:mb-0 me-4 p-3 pt-0 sm:d-flex justify-between md:d-block">
				<div>
					<p className="mb-0" style={{ fontSize: "1.3rem" }}>
						Resources
					</p>
					<ul>{resources_backup}</ul>
				</div>

				<div>
					<p className="mb-0" style={{ fontSize: "1.3rem" }}>
						Server Backup
					</p>
					<ul>{server_backup}</ul>
				</div>
			</div>
		</div>
	);
};

export default Backup;
