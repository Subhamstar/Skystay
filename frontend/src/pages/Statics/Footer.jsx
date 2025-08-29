import React from "react";
import facebook from "../../assets/socialMedia/facebook.png";
import twitter from "../../assets/socialMedia/twitter.png";
import linkedin from "../../assets/socialMedia/linkedin.png";
import github from "../../assets/socialMedia/github.png";
// import ''

const Footer = () => {
  return (
    
    <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-52">
      <div className="relative w-full h-[1px] bg-black  overflow-hidden mb-4">
      <div className="absolute top-0 left-[-50%] w-1/2 h-full bg-white opacity-30 shimmer-animation"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-2xl fonat-semibold text-blueGray-700">
             <span className="text-pink-600">No 1 </span>Trusted Home Rental Website 
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10  items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <a href="" target="_blank">
                  <img src={facebook} alt="facebook" className="w-10 h-10" />
                </a>
              </button>
              <button
                className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <a href="/" target="_blank">
                  <img src={twitter} alt="twitter" className="w-10 h-10" />
                </a>
              </button>
              <button
                className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <a href="https://github.com/Subhamstar" target="_blank">
                  <img src={github} alt="github" className="w-10 h-10" />
                </a>
              </button>
              <button
                className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <a
                  href="/"
                  target="_blank"
                >
                  <img src={linkedin} alt="linkedin" className="w-10 h-10" />
                </a>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="/" target="_blank"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="/" target="_blank"
                    >
                      Github
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2025 </span>
              Created by Subham.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
