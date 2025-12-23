import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../utils/axios";
import NoImage from "../assets/images/NoImage.jpg";

const Blog = () => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState({});

  const getBlogDetails = async () => {
    try {
      const { data, statusText } = await api.get(
        `https://ilkinibadov.com/api/b/blogs/blog/${id}`
      );
      if (statusText === "OK") {
        console.log(data);
        setBlogDetails(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [id]);

  return (
    <div className="max-w-[1440px] mx-auto min-h-screen">
      <Navbar />
      <div className="max-w-[1216px] mx-auto pt-20 px-4 md:px-24 lg:px-60 mb-[122px]">
        <h1 className="bg-[#4B6BFB] inline-block text-white py-1.5 px-3 rounded-lg">
          {blogDetails.category}
        </h1>
        <p className="text-2xl font-bold mt-4">{blogDetails.title}</p>
        <div className="flex gap-4 mt-5 mb-8">
          <p className="text-[#696A75]">{blogDetails.user?.email}</p>
          <p className="text-[#696A75]">
            {new Date(blogDetails.createdAt).toLocaleDateString()}
          </p>
        </div>
        <img
          className="w-full h-screen max-w-[800px] max-h-[462px] object-cover rounded-lg mx-auto mb-8"
          src={blogDetails.image === "" ? NoImage : blogDetails.image}
          alt={blogDetails.title || "Blog image"}
        />
        <p>{blogDetails.description}</p>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
