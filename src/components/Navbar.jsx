import Logo from "../assets/images/Logo.png";
import Search from "../assets/icons/search.png";
import Sunny from "../assets/icons/sunny.png";
import { Link } from "react-router-dom";
import { useDarkmode } from "../stores/darkmodeStore";

const Navbar = () => {
  const { isDarkmodeActive, toggleDarkmode } = useDarkmode();

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 transition-transition duration-200">
      <div className="flex-shrink-0">
        <img
          className={`w-[120px] md:w-[156px] h-auto transition-transition duration-200${
            isDarkmodeActive ? "filter brightness-0 invert" : ""
          }`}
          src={Logo}
          alt="Logo"
        />
      </div>

      <div className="flex flex-wrap gap-4 md:gap-10 justify-center md:justify-start">
        <Link
          to="/"
          className={`hover:text-blue-500 ${
            isDarkmodeActive ? "text-white" : "text-[#181A2A]"
          }`}
        >
          Home
        </Link>
        <Link
          to="/writeblog"
          className={`hover:text-blue-500 ${
            isDarkmodeActive ? "text-white" : "text-[#181A2A]"
          }`}
        >
          Write a Blog
        </Link>
        <Link
          to="/myblogs"
          className={`hover:text-blue-500 ${
            isDarkmodeActive ? "text-white" : "text-[#181A2A]"
          }`}
        >
          My Blogs
        </Link>
        <p
          className={`hover:text-blue-500 cursor-pointer ${
            isDarkmodeActive ? "text-white" : "text-[#181A2A]"
          }`}
        >
          Contact
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4 md:mt-0">
        <div className="relative">
          <input
            className={`w-[140px] md:w-[166px] h-[36px] px-4 py-2 rounded-lg outline-none pr-10 ${
              isDarkmodeActive
                ? "bg-[#242535] text-white placeholder-gray-400"
                : "bg-[#F4F4F5] text-black"
            }`}
            placeholder="Search"
            type="search"
          />
          <img
            className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5"
            src={Search}
            alt="Search"
          />
        </div>

        <div
          onClick={toggleDarkmode}
          className={`flex items-center w-[48px] h-[28px] rounded-full cursor-pointer relative transition-colors duration-200 ${
            isDarkmodeActive ? "bg-[#4B6BFB]" : "bg-[#E4E4E7]"
          }`}
        >
          <div
            className={`bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center transition-transform duration-300 ease-in-out ${
              isDarkmodeActive ? "translate-x-[22px]" : "translate-x-[2px]"
            }`}
          >
            <img className="w-[20px] h-[20px]" src={Sunny} alt="Theme" />
          </div>
        </div>

        <Link to="/login">
          <button
            className={`w-[68px] h-[36px] bg-[#141624] text-white rounded-[5px]
  transition-all duration-200 ease-out
  hover:scale-105 hover:shadow-lg hover:shadow-black/40 cursor-pointer ${
    isDarkmodeActive ? "bg-[#242535]" : "bg-[#141624]"
  }`}
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
