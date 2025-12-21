import { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

const NotFound =()=>{
    const navigate = useNavigate()

    useEffect(()=>{
        const timer =setTimeout(()=>{
            navigate("/")
        },3000)
        return ()=> clearTimeout(timer)
    })
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center text-2xl">
            <h1>PAGE NOT FOUND</h1>
            <Link className="text-base font-medium text-white bg-red-600 px-4 py-2" to="/">GO TO HOME PAGE</Link>
        </div>
    )
}
export default NotFound