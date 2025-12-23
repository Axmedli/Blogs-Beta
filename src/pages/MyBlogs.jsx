import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/axios";
import { useTokens } from "../stores/tokenStore";
import { useDarkmode } from "../stores/darkmodeStore";

const MyBlogs = () => {
  const { isDarkmodeActive } = useDarkmode();
  const [user, setUser] = useState([]);
  const { email } = useTokens();

  const getUserInfo = async () => {
    const { data, statusText } = await api.get("/blogs/user/me");
    if (statusText === "OK") {
      setUser(data);
      console.log(data);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const { status } = await api.delete(`/blogs/${id}`);
      if (status === 200 || status === 204) {
        alert("Blog successfully deleted ✅");
        setUser((prev) => prev.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete blog ❌");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div
      className={`w-full mx-auto min-h-screen transition-transition duration-200 ${
        isDarkmodeActive ? "bg-[#181A2A] text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />
      <div className="max-w-[1216px] mx-auto px-4 py-10">
        <h1
          className={`text-center text-xl font-bold mb-12  py-12 rounded-lg ${
            isDarkmodeActive ? "bg-[#242535]" : "bg-[#F6F6F7]"
          }`}
        >
          {email}
        </h1>
        <h2
          className={`text-xl font-bold mb-10 ${
            isDarkmodeActive ? "hidden" : "text-black"
          }`}
        >
          Latest Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.length > 0 ? (
            user.map((blog) => (
              <div
                key={blog._id}
                className={`max-w-[392px] h-[426px] border p-4 rounded-lg shadow-lg hover:shadow-xl transition hover:scale-[1.02] cursor-pointer mx-auto ${
                  isDarkmodeActive
                    ? "border-[#242535] bg-[#181A2A] text-white"
                    : "border-gray-300 bg-white text-black"
                }`}
              >
                <div className="relative">
                  <img
                    className="w-full h-[200px] rounded-lg object-cover"
                    src={blog.image === "" ? NoImage : blog.image}
                    alt={blog.title}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(blog._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                    title="Delete blog"
                  >
                    X
                  </button>
                </div>

                <h2 className="bg-[#4B6BFB0D] font-semibold mt-3 text-[#4B6BFB] inline-block rounded-lg py-1 px-2.5">
                  {blog.category}
                </h2>
                <p className="font-bold my-4 ml-[2px] line-clamp-2">
                  {blog.title}
                </p>
                <div className="flex gap-4 mt-5 text-sm text-[#696A75]">
                  <p className="line-clamp-2">
                    {blog.user?.email || blog.author}
                  </p>
                  <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center py-10">
              There is no blog post yet.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
