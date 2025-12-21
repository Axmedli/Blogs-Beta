import { Link } from "react-router-dom";
import NoImage from "../assets/images/NoImage.jpg";


const Blogs = ({ blog, type = "small" }) => {
  if (type === "large") {
    return (
      <Link to={`/blog/${blog._id}`}>
        <div className="max-w-[1216px] h-[450px] relative mx-auto hover:scale-[1.02] transition cursor-pointer">
          <img
            className="rounded-[15px] w-full h-full object-cover"
            src={blog.image || blog.images?.[0]}
            alt=""
          />

          <div className="absolute left-[40px] bottom-[40px] text-white">
            <button className="bg-[#4B6BFB] py-[4px] px-[10px] rounded-[8px] mb-[16px]">
              {blog.category}
            </button>

            <h1 className="text-4xl font-bold max-w-[720px] mb-4 line-clamp-2">
              {blog.title}
            </h1>

            <p className="opacity-80">
              {blog.user.email} · {blog.createdAt}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${blog._id}`}>
      <div className="max-w-[392px] h-[476px] border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition hover:scale-[1.02] cursor-pointer mx-auto">
        <img
          className="w-full h-[200px] rounded-lg object-cover"
          src={blog.image === "" ? NoImage : blog.image}
          alt=""
        />
        <h2 className="bg-[#4B6BFB0D] font-semibold mt-3 text-[#4B6BFB] inline-block rounded-lg py-1 px-2.5 ">
          {blog.category}
        </h2>
        <p className="font-bold my-4 ml-[2px] line-clamp-2">{blog.title}</p>
        <p className="text-[#696A75] mt-5 mb-8 line-clamp-2">{blog.user?.email}</p>
      </div>
    </Link>
  );
};

export default Blogs;
