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
        <a className="block text-blue-200" href={item.link}>
          <p>{item.name}</p>
        </a>
      </li>
    ));
    return component;
  };

  const resources_backup = links_to_component(resources_backup_links);
  const server_backup = links_to_component(server_backup_links);

  return (
    <div className=" text-red-400">
      <p className="text-3xl mb-0 pl-3">Backups</p>
      <div className="mb-4 md:mb-0 me-4 p-3 pt-0 sm:flex justify-between md:justify-start">
        <div>
          <p className="text-orange-200" style={{ fontSize: "1.3rem" }}>
            Resources
          </p>
          <ul>{resources_backup}</ul>
        </div>

        <div>
          <p className="text-orange-200" style={{ fontSize: "1.3rem" }}>
            Server Backup
          </p>
          <ul>{server_backup}</ul>
        </div>
      </div>
    </div>
  );
};

export default Backup;
