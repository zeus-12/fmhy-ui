import Backup from "./Backup";

const About = () => {
  return (
    <div className="p-2 pt-0">
      <div className="">
        <p className="pl-3 text-3xl text-[#EDC988]">Vision</p>
      </div>

      <div className="py-4 lg:flex justify-evenly items-center gap-6">
        <div className="mb-3 lg:mb-0 flex justify-center ">
          <img
            className="w-[300px] lg:max-w-xl"
            src="../assets/help.svg"
            alt=""
          />
        </div>
        <p
          className=" p-3 pt-0 rounded-lg bg-[#121212] text-[#DEEEEA] text-[1.1rem]"
          style={{
            fontFamily: "courier",
          }}
        >
          Our goal is to spread free education and entertainment to as many
          people as we can, and fight for the rights of those who feel left
          behind to be happy, educated, and comfortable, despite their economic
          circumstances.
          <br /> We want to show people what the world could look like if we
          started treating everyone as equally deserving of all things good. To
          organize, index and preserve as many sites and as much content as we
          possibly can, both for people now and people in the future.
          <br /> We want to do our best to lead by example, and prove that
          putting others before ourselves really does make the world a better
          place.
        </p>
      </div>

      <p className="text-3xl pl-3 text-red-500">Promise</p>
      <div className="lg:flex gap-6 justify-evenly items-center rounded-lg bg-[#121212] text-[#DEEEEA] text-[1.1rem]">
        <p
          className="p-3 pt-0"
          style={{
            fontFamily: "courier",
          }}
        >
          "I'm not ever going to let this project die. Even if something were to
          happen to me, it would be in good hands thanks to the awesome mods in
          discord. I just wanted to say this because sometimes projects like
          this end up slowly dying, and that isn't going to happen with us.
          <br />
          Giving as many people as possible access to educational material and
          entertainment does make the world a smarter and happier place.
          <br />
          Sharing is, always has been, and always will be the right thing to do,
          and until we live in a world that doesn't need to be shown that, we'll
          be here."
          <span
            className="block font-semibold"
            style={{ fontFamily: "helvetica" }}
          >
            - nbatman
          </span>
        </p>
        <div className="flex justify-center">
          <img
            className="w-[300px] lg:max-w-xl"
            alt="logo gif"
            src="../../assets/logo-gif.gif"
          />
        </div>
      </div>
      <div className="md:flex pt-4 justify-evenly">
        <Backup />

        {/* contribute section */}
        <div className="pl-3">
          <p className="text-3xl text-lime-400">Contribute</p>

          <p>
            <a className="text-cyan-400" href="https://rentry.co/FMHYedit">
              Edit FMHY
            </a>{" "}
            Make changes to the FMHY Wiki
          </p>
          <p>
            <a
              className="text-cyan-400"
              href="https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/find-new-sites"
            >
              Site Hunting Guide
            </a>{" "}
            Help us Discover New Sites
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
