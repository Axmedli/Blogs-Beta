import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/axios";
import { useTokens } from "../stores/tokenStore";

const MyBlogs = () => {
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
    <div className="max-w-[1440px] mx-auto min-h-screen">
      <Navbar />
      <div className="max-w-[1216px] mx-auto px-4 py-10">
        <h1 className="text-center text-xl font-bold mb-12 bg-[#F6F6F7] py-12 rounded-lg">
          {email}
        </h1>
        <h2 className="text-xl font-bold mb-10">Latest Posts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.length > 0 ? (
            user.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition hover:scale-[1.02] cursor-pointer"
              >
                <div className="relative group">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(blog._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    title="Delete blog"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                    {blog.category}
                  </span>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{blog.author}</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
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
