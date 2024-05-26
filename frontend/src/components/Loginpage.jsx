import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tokenAtom } from "../store/atom/token";
import Toast from "./Toasts/Toast";
import axios from "axios";
const Loginpage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [token, setToken] = useRecoilState(tokenAtom);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const myStyle = {
    backgroundImage: 'url("../public/login-bg.jpg")',
    backgroundSize: "cover",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password){
      setToast("toast-danger");
      setToastMessage("Please fill all the Fields");
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
      }, 3000);
      return;
  }
  try{
      const config = {
          headers: {
            "Content-Type": "application/json",
          },
      };
      const { data } = await axios.post(
          "http://localhost:8000/api/v1/user/signin",
          {
            email,
            password
          },
          config
      );
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      setToken(data.token);
      console.log(token);
      setToast("toast-success");
      setToastMessage("Logged in successfully, Welcome!");
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
      }, 3000);
      navigate('/');
  }catch(err){
      setToast("toast-danger");
      setToastMessage("Error Occured");
      console.log(err.message);
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
      }, 3000);
      return;
  }
  }

  return (
    <div className=" bg-white h-screen w-screen py-14 " style={myStyle}>
      <div className="mx-auto h-fit w-[30rem] bg-white bg-opacity-80 py-16 px-8 relative">
        <h1 className="text-black font-bold text-center mb-14">Sign in</h1>
        <form
          onSubmit={handleSubmit}
          className="text-black flex flex-col items-start space-y-10 mb-24"
        >
          <div className="self-stretch">
            <label htmlFor="" className="self-start text-xl">
              Email:
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
          <button type="submit" className=" text-white self-stretch bg-sky-950">
            Submit
          </button>
        </form>
        <div className="flex justify-between">
          <Link to="/signup" className="text-sm hover:underline hover:underline-offset-2">
            Don't have an account? Sign up
          </Link>
          <a onClick={()=>navigate('/')}  to="/" className="text-sm hover:underline hover:underline-offset-2 cursor-pointer">
            Skip for now
          </a>
        </div>
      </div>
      {showToast?<Toast setShowToast={setShowToast} message={toastMessage} toast={toast} />:<div/>}
    </div>
  );
};

export default Loginpage;
