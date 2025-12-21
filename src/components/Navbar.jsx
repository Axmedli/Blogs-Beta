import Logo from "../assets/images/Logo.png";
import Search from "../assets/icons/search.png";
import Sunny from "../assets/icons/sunny.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
      <div className="flex-shrink-0">
        <img className="w-[120px] md:w-[156px] h-auto" src={Logo} alt="Logo" />
      </div>

      <div className="flex flex-wrap gap-4 md:gap-10 justify-center md:justify-start">
        <Link to="/" className="text-[#3B3C4A] hover:text-blue-500">
          Home
        </Link>
        <Link to="/writeblog" className="text-[#3B3C4A] hover:text-blue-500">
          Write a Blog
        </Link>
        <Link to="/myblogs" className="text-[#3B3C4A] hover:text-blue-500">
          My Blogs
        </Link>
        <a className="text-[#3B3C4A] hover:text-blue-500" href="">
          Contact
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4 md:mt-0">
        <div className="relative">
          <input
            className="w-[140px] md:w-[166px] h-[36px] px-4 py-2 rounded-lg outline-none bg-[#F4F4F5] pr-10"
            placeholder="Search"
            type="search"
          />
          <img
            className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5"
            src={Search}
            alt="Search"
          />
        </div>

        <div className="flex items-center w-[48px] h-[28px] bg-[#E8E8EA] rounded-full">
          <div className="bg-white rounded-full w-[24px] h-[24px] ml-[2px] flex items-center justify-center">
            <img className="w-[20px] h-[20px]" src={Sunny} alt="Theme" />
          </div>
        </div>

        <Link to="/login">
          <button
            className="w-[68px] h-[36px] bg-[#141624] text-white rounded-[5px]
  transition-all duration-300 ease-out
  hover:scale-105 hover:shadow-lg hover:shadow-black/40 cursor-pointer"
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
