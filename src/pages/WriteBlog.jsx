import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/axios";
import { useTokens } from "../stores/tokenStore";

const WriteBlog = () => {
  const { accessToken } = useTokens();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    thumbnail: "",
    body: "",
  });

  const getCategories = async () => {
    try {
      const { data, status } = await api.get("/blogs/categories");
      if (status === 200) {
        setCategories(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      alert("You must select a category ❌");
      return;
    }

    try {
      const { data, status } = await api.post("/blogs", {
        title: formData.title,
        description: formData.body,
        category: formData.category,
        image: formData.thumbnail,
      });

      if (status === 201 || status === 200) {
        alert("Blog successfully created ✅");
        setFormData({
          title: "",
          category: "",
          thumbnail: "",
          body: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Blog creation failed ❌");
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto min-h-screen">
      <Navbar />
      <div className="max-w-[1216px] mx-auto px-4 py-10">
        <div className="max-w-[800px] mx-auto flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-[54px]">Write a New Blog</h1>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="text"
              placeholder="Add title for blog"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full h-[76px] px-4 outline-none border text-[#232536] border-[#6D6E7680]"
            />

            <select
              required
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="border border-[#6D6E7680] w-full h-[76px] px-4 text-[#232536] bg-white appearance-none cursor-pointer outline-none"
            >
              <option value="" disabled hidden>
                Select category
              </option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))
              ) : (
                <option disabled>Loading categories...</option>
              )}
            </select>

            <input
              type="text"
              placeholder="Add thumbnail image"
              value={formData.thumbnail}
              onChange={(e) => handleInputChange("thumbnail", e.target.value)}
              className="w-full h-[76px] px-4 outline-none border text-[#232536] border-[#6D6E7680]"
            />

            <textarea
              rows={10}
              placeholder="Add blog body"
              value={formData.body}
              onChange={(e) => handleInputChange("body", e.target.value)}
              className="w-full px-4 py-2 outline-none border text-[#232536] border-[#6D6E7680] resize-none"
            />

            <button
              type="submit"
              className="w-full h-[60px] bg-[#FFD050] text-black font-medium cursor-pointer hover:bg-[#e6bc48]"
            >
              Publish Blog
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WriteBlog;