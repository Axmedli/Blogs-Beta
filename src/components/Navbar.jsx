import Logo from "../assets/images/Logo.png";
import Search from "../assets/icons/search.png";
import Sunny from "../assets/icons/sunny.png";
import NoImage from "../assets/images/NoImage.jpg";
import { Link } from "react-router-dom";
import { useDarkmode } from "../stores/darkmodeStore";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const { isDarkmodeActive, toggleDarkmode } = useDarkmode();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      try {
        const { data, statusText } = await axios.get(
          `https://ilkinibadov.com/api/b/blogs?search=${searchQuery}`
        );
        if (statusText === "OK") {
          console.log("Search Results:", data.blogs);
          setSearchResults(data.blogs);
          setShowResults(true);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
          <img
            className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5"
            src={Search}
            alt="Search"
          />
          {showResults && searchResults.length > 0 && (
            <div
              className={`
      absolute top-full mt-2
      left-0 w-[190px]
      md:left-1/2 md:-translate-x-1/2 md:w-[95vw] md:max-w-[720px]
      max-h-[55vh] md:max-h-[420px]
      overflow-y-auto rounded-lg md:rounded-xl
      shadow-xl z-50 p-1 md:p-2
      ${isDarkmodeActive ? "bg-[#1a1b26]" : "bg-white"}
    `}
            >
              {searchResults.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog._id}`}
                  onClick={() => setShowResults(false)}
                  className="block"
                >
                  <div
                    className={`
            flex gap-2 md:gap-3
            p-2 md:p-3
            rounded-md md:rounded-lg
            transition-all
            ${
              isDarkmodeActive
                ? "active:bg-[#242535] md:hover:bg-[#242535]"
                : "active:bg-gray-100 md:hover:bg-gray-100"
            }
          `}
                  >
                    <img
                      src={blog.image === "" ? NoImage : blog.image}
                      className="
              w-[52px] h-[52px]
              md:w-[72px] md:h-[72px]
              object-cover rounded-md flex-shrink-0
            "
                      alt={blog.title}
                    />

                    <div className="flex flex-col gap-0.5 md:gap-1 min-w-0">
                      <span className="text-[10px] md:text-xs text-[#4B6BFB] font-medium">
                        {blog.category}
                      </span>

                      <p
                        className={`
                text-xs md:text-sm font-semibold
                line-clamp-2 leading-snug
                ${isDarkmodeActive ? "text-white" : "text-[#181A2A]"}
              `}
                      >
                        {blog.title}
                      </p>

                      <span className="text-[10px] md:text-xs text-[#696A75] truncate">
                        {blog.user?.email}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
