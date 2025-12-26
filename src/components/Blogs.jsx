import { Link } from "react-router-dom";
import NoImage from "../assets/images/NoImage.jpg";
import { useDarkmode } from "../stores/darkmodeStore";

const Blogs = ({ blog, type = "small" }) => {
  const { isDarkmodeActive } = useDarkmode();
  if (type === "large") {
    return (
      <Link to={`/blog/${blog._id}`}>
        <div
          className="max-w-[1216px] h-[220px] sm:h-[300px] md:h-[380px] lg:h-[450px] 
                relative mx-auto hover:scale-[1.02] transition cursor-pointer px-4"
        >
          <img
            className="rounded-[12px] md:rounded-[15px] w-full h-full object-cover"
            src={blog.image || blog.images?.[0]}
            alt=""
          />

          <div
            className="absolute left-4 bottom-4 
                  sm:left-6 sm:bottom-6 
                  md:left-10 md:bottom-10 
                  text-white"
          >
            <button
              className="bg-[#4B6BFB] 
                       text-xs sm:text-sm 
                       py-[2px] sm:py-[4px] 
                       px-[8px] sm:px-[10px] 
                       rounded-[6px] sm:rounded-[8px] 
                       mb-2 sm:mb-4"
            >
              {blog.category}
            </button>

            <h1
              className="text-lg sm:text-xl md:text-3xl lg:text-4xl 
                   font-bold max-w-full md:max-w-[720px] 
                   mb-2 sm:mb-4 line-clamp-2"
            >
              {blog.title}
            </h1>

            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs sm:text-sm opacity-90">
              <p>{blog.user.email}</p>
              <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${blog._id}`}>
      <div
        className={`max-w-[392px] h-[426px] border p-4 rounded-lg shadow-lg hover:shadow-xl transition hover:scale-[1.02] cursor-pointer mx-auto ${
          isDarkmodeActive ? "border-[#242535]" : "border-gray-300"
        }`}
      >
        <img
          className="w-full h-[200px] rounded-lg object-cover"
          src={blog.image === "" ? NoImage : blog.image}
          alt=""
        />
        <h2 className="bg-[#4B6BFB0D] font-semibold mt-3 text-[#4B6BFB] inline-block rounded-lg py-1 px-2.5 ">
          {blog.category}
        </h2>
        <p className="font-bold my-4 ml-[2px] line-clamp-2">{blog.title}</p>
        <div className="flex gap-4 mt-5">
          <p className="text-[#696A75] line-clamp-2">{blog.user?.email}</p>
          <p className="text-[#696A75]">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Blogs;
