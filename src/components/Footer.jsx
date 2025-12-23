import { useDarkmode } from "../stores/darkmodeStore";
const Footer = () => {
  const { isDarkmodeActive } = useDarkmode();

  return (
    <footer
      className={`max-w-[1440px] w-full py-16 mx-auto ${
        isDarkmodeActive
          ? "bg-[#141624] border-t border-[#242535]"
          : "bg-[#E8E8EA]"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex flex-col md:flex-row  gap-12 px-6 ${
          isDarkmodeActive ? "" : "justify-between"
        }`}
      >
        <div className="max-w-sm">
          <h2
            className={`font-bold text-lg mb-4 ${
              isDarkmodeActive ? "text-white" : "text-black"
            }`}
          >
            About
          </h2>
          <p className="mb-6 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
          <p className={`text-sm ${isDarkmodeActive ? "text-white" : "text-black"}`}>
            <span className="font-semibold">Email:</span> info@jstemplate.net
          </p>
          <p className={`text-sm ${isDarkmodeActive ? "text-white" : "text-black"}`}>
            <span className="font-semibold">Phone:</span> 880 123 456 789
          </p>
        </div>

        <div className="flex gap-20">
          <div>
            <h2
              className={`font-bold text-lg mb-4 ${
                isDarkmodeActive ? "text-white" : "text-black"
              }`}
            >
              Quick Link
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>Home</li>
              <li>Write a Blog</li>
              <li>My Blogs</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h2
              className={`font-bold text-lg mb-4 ${
                isDarkmodeActive ? "text-white" : "text-black"
              }`}
            >
              Category
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>Lifestyle</li>
              <li>Technology</li>
              <li>Travel</li>
              <li>Business</li>
              <li>Economy</li>
              <li>Sports</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
