import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/axios";

const MyBlogs = () => {
    const [user, setUser] = useState({})

    const getUserInfo = async () => {
        const { data, statusText } = await api.get("/blogs/user/me")
        if (statusText === "OK") {
            setUser(data)
            console.log(data);
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])
  return (
    <div className="max-w-[1440px] mx-auto min-h-screen">
      <Navbar />
      <div className="max-w-[1216px] mx-auto px-4 py-10">

      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
