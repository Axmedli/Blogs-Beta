import { Routes, Route } from "react-router-dom"
import NotFound from "../pages/NotFound"
import { useTokens } from "../stores/tokenStore"
import Homepage from "../pages/Homepage"
import Blog from "../pages/Blog"
import Login from "../pages/Login"
import Register from "../pages/Register"
import MyBlogs from "../pages/MyBlogs"
import WriteBlog from "../pages/WriteBlog"

const Navigator = () => {
    const { accessToken } = useTokens()

    return (
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/blog/:id" element={<Blog/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/myblogs" element={<MyBlogs/>} />
            <Route path="/writeblog" element={<WriteBlog/>} />
            {/* {accessToken && <Route path="/profile" element={<Profile />} />} */}

            <Route path="*" element={<NotFound />} />
            
        </Routes>
    )
}

export default Navigator