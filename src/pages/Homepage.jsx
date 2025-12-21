import Blogs from "../components/Blogs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);

  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await fetch(
        `https://ilkinibadov.com/api/b/blogs?limit=${limit}`
      );
      const data = await res.json();
      if (res.ok) {
        setBlogs(data.blogs);
      }
    };
    getBlogs();
  }, [limit]);

  return (
    <div className="max-w-[1440px] mx-auto min-h-screen">
      <Navbar />

      <div className="max-w-[1216px] mx-auto">
        {blogs[0] && (
          <div className="mb-8 px-4">
            <Blogs blog={blogs[0]} type="large" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 mb-10">
          {blogs.slice(1).map((blog) => (
            <Blogs key={blog._id} blog={blog} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-10">
        <button
          onClick={() => setLimit((prev) => prev + 3)}
          className="text-[#696A75] py-[12px] px-[20px] rounded
  border border-[#696A754D] transition cursor-pointer hover:bg-[#F5F5F5]"
        >
          Load More
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
