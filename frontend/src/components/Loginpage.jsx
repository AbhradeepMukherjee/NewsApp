import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
const Loginpage = ({showLogin, setShowLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const myStyle = {
    backgroundImage: 'url("../public/login-bg.jpg")',
    backgroundSize: "cover",
  };

  return (
    <div className=" bg-white h-full w-screen py-14 " style={myStyle}>
      <div className="mx-auto h-[40rem] w-[30rem] bg-white bg-opacity-80 py-16 px-8 relative">
        <h1 className="text-black font-bold text-center mb-14">Sign in</h1>
        <form
          action=""
          className="text-black flex flex-col items-start space-y-10 mb-24"
        >
          <div className="self-stretch">
            <label htmlFor="" className="self-start text-xl">
              Email
            </label>
            <input
              type="text"
              className="bg-slate-50 w-full h-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative self-stretch">
            <label htmlFor="" className="self-start text-xl">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="bg-slate-50 w-full h-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-11 right-0 pr-3 text-xl flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className=" text-white self-stretch bg-sky-950">
            Submit
          </button>
        </form>
        <div className="flex justify-between">
          <Link to="/sign-up" className="text-sm hover:underline hover:underline-offset-2">
            Don't have an account? Sign up
          </Link>
          <a onClick={()=>setShowLogin(!showLogin)}  to="/" className="text-sm hover:underline hover:underline-offset-2 cursor-pointer">
            Skip for now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
