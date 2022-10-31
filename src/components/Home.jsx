import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="px-4">
      <div className="lg:flex justify-center items-center lg:justify-evenly">
        <div className="my-auto">
          <div className="flex sm:justify-center">
            <h1 className="text-[3.2rem]" style={{ fontFamily: "poppins" }}>
              Hey 👋
            </h1>
          </div>

          <div className="flex justify-center items-center flex-col">
            <p
              className="col lg:col-10 text-xl lg:px-12"
              style={{ fontFamily: "courier" }}
            >
              Most of the people new to FreeMediaHeckYeah can find our massive
              wiki overwhelming when taking their first look at it. So the
              members of r/FMHY thought that we should make a curated list of
              common sites that we use, one that's much shorter and not an
              entire list of every site we've aggregated over the years, making
              it much easier to navigate 💖 It'll be some underrated sites, ones
              that we use everyday, and guides that may come in handy for a lot
              of people!
            </p>
            <p className="text-center pt-2 xl:pt-4 lg:px-10 my-2">
              Check out our{" "}
              <Link className="text-cyan-400" to="/about">
                Vision
              </Link>{" "}
              & get started with our
              <a className="text-cyan-400" href="https://rentry.org/Piracy-BG">
                {" "}
                Beginners Guide to Piracy
              </a>
            </p>
            <div className="flex justify-center mb-3">
              <a
                className="px-2 py-2 rounded-md text-white bg-cyan-700"
                href="https://fmhy.divolt.xyz/"
              >
                Join the Revolt Server!{" "}
                <a
                  className="text-gray-300"
                  href="https://www.reddit.com/r/FREEMEDIAHECKYEAH/comments/uto5vw/revolt_server/"
                >
                  (Instructions)
                </a>
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="max-h-[85vh] w-auto max-w-[100vw]"
            alt="pirate"
            src="../../assets/pirate.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
