import TopNavBar from "./navbar/TopNavBar";
import NavBar from "./navbar/NavBar";
import { CategoryArray } from "./context/Globals";

const AboutUs = () => {
  return (
    <div className="app-wrapper">
      <TopNavBar />
      <NavBar obj={CategoryArray} />
      <div className="main-container px-3 ">
        <div className="AboutHeader bg-gradient-to-r from-[#282667] to-slate-900 p-4 sm:p-7 mx-4 rounded-2xl mb-5 2xl:mx-8">
          <h1 className="AboutTitle text-2xl sm:text-4xl text-white text-center font-medium">
            ABOUT US
          </h1>
        </div>
      </div>
      <div>
        <div className="body-container px-8 2xl:px-12">
          <div className=" top-container flex flex-col bg-white shadow-xl rounded-xl lg:flex-row">
            <div className="about-container gap-1 flex flex-col p-5 md:px-8 md:pt-10 w-full md:pb-8 2xl:px-14">
              <p className="font-normal text-sm md:text-base">About Us</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                A Unified Online Marketplace for Trailblazers
              </h1>
              <hr className="my-4 border"></hr>
              <p className="text-sm font-normal lg:text-base">
                Our marketplace is a platform where students can easily share
                their thoughts, goods, and services. It is a stable environment
                for Trailblazers and it helps you create a positive experience
                in the university. Connect, collaborate, and grow with the tools
                you need. Join us in redefining campus engagement!
              </p>
            </div>
            <div className="img-container w-full mt-1 sm:px-5 sm:pb-5 md:px-8 lg:p-0">
              <img
                src="public\img\ustp.jpg"
                alt="TrailMarket"
                className="size-full object-cover rounded-xl shadow-md w-full lg:rounded-l-none"
              />
            </div>
          </div>
          <div className="bottom-container flex flex-col my-5 bg-white rounded-xl shadow-xl p-5 gap-5  md:flex-row items-center lg:px-10 2xl:px-14">
            <div className="addtl-text text-center font-semibold text-xl md:w-[30rem] 2xl:w-[50rem] md:text-left">
              <h1 className="text-xl md:text-3xl 2xl:text-4xl">
                For Additional Information, Feel Free to Contact Us
              </h1>
            </div>
            <hr className="border md:border-2 w-full md:w-0 md:h-56"></hr>
            <div className="links-container flex flex-col gap-2 w-full p-0 md:p-10 xl:p-16 xl:px-36">
              <p className="text-center font-normal text-sm mb-2 md:text-base md:text-left md:ml-2 2xl:text-lg">
                Contact Links
              </p>
              <div className="links-container-1 flex justify-center gap-2 xl:gap-4">
                <button className="border-2 shadow-md border-black p-1 px-5 rounded-full w-full flex justify-center items-center gap-2">
                  <img
                    src="public\assets\fb.svg"
                    className="w-7 sm:my-1 xl:w-8 text-red"
                  />
                  <p className="hidden sm:flex text-center text-sm xl:text-lg">
                    Facebook
                  </p>
                </button>
                <button
                  className="border-2 shadow-md border-black p-1 px-5 rounded-full w-full flex justify-center items-center gap-2"
                  onClick={() => {
                    window.location.href =
                      "https://github.com/potakaaa/trailmarket";
                  }}
                >
                  <img
                    src="public\assets\github.svg"
                    className="w-7 sm:my-1 xl:w-8"
                  />
                  <p className="hidden sm:flex text-center text-sm xl:text-lg">
                    Github
                  </p>
                </button>
              </div>
              <div className="links-container-2 flex justify-center gap-2 xl:gap-4">
                <button className="border-2 shadow-md border-black p-1 px-5 rounded-full w-full flex justify-center items-center gap-2">
                  <img
                    src="public\assets\twitter.svg"
                    className="w-7 sm:my-1 xl:w-8"
                  />
                  <p className="hidden sm:flex text-center text-sm xl:text-lg">
                    Twitter
                  </p>
                </button>
                <button className="border-2 shadow-md border-black p-1 px-5 rounded-full w-full flex justify-center items-center gap-2">
                  <img
                    src="public\assets\email.svg"
                    className="w-7 sm:my-1 xl:w-8"
                  />
                  <p className="hidden sm:flex text-center text-sm xl:text-lg">
                    Email
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
