import React, { useState } from "react";
import googleImg from "../assets/google-icon.svg";
import microsoftImg from "../assets/microsoft-icon.svg";
import eyeHide from "../assets/eye-hide-icon.svg";
import eyeOpen from "../assets/eye-visible-icon.svg";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import select from '../assets/checkbox-selected-icon.svg';
import unselect from '../assets/checkbox-unselected-icon.svg';
import { Tooltip } from "react-tooltip";
import { useGoogleLogin } from "@react-oauth/google";
import { toast, ToastContainer } from "react-toastify";
const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", name: "" });
  const [isChecked, setIsChecked] = useState(false);

  const validateForm = () => {
    let newErrors = { name: "", phone: "", email: "", password: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
      toast.error("Name is required");
    } else if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
      toast.error("Phone number is required");
    }else if (phone.length < 10) {
      newErrors.phone = "Enter Valid Phone Number";
      isValid = false;
      toast.error("Enter Valid Phone Number");
    } else if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
      toast.error("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
      toast.error("Invalid email format");
    } else if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
      toast.error("Password is required");
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
      toast.error("Password must be at least 6 characters");
    } else if (!isChecked) {
      newErrors.terms = "You must accept the terms and conditions";
      isValid = false;
      toast.error("You must accept the terms and conditions!");
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", { email, password, name, phone });
      setEmail("");
      setPassword("");
      setName("");
      setPhone("");
      setIsChecked(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google Auth Success:', tokenResponse);
            try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        console.log('User Info:', userInfo.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => console.log('Google Auth Failed'),
  });

  return (
    <div>
      <div className="min-h-screen  flex items-center justify-center p-4 Login">
        <div className="max-w-lg w-full bg-white Login-Container ">
          <div className="login-title">
            <h2 className="text-[1.375rem] font-medium text-[rgb(85,85,85)]  text-center">
              Create Account
            </h2>
            <p className="text-center mb-4 text-[0.8125rem] font-[400] text-[rgb(85,85,85)]">
              Enter your credential to access your account
            </p>
          </div>

          <div className="flex gap-4 mb-2.5">
            <button
              type="button"
              title="Google"
              onClick={login}
              className="flex items-center justify-center gap-2 w-full h-[35px] bg-white text-[#555] border-none outline-none rounded-[2px] px-2 cursor-pointer  text-[1rem]"
            >
              <div className="w-[14px] h-[14px]">
                <img
                  src={googleImg}
                  alt="Google"
                  width="14"
                  height="14"
                  className="w-full h-full"
                 
                />
              </div>
              <span className=" text-[16px] font-medium">Google</span>
            </button>

            <button
              type="button"
              title="Microsoft"
              className="flex items-center justify-center gap-2 w-full h-[35px] bg-white text-[#555] border-none outline-none rounded-[2px] px-2 cursor-pointer  text-[1rem]"
            >
              <div className="w-[14px] h-[14px]">
                <img
                  src={microsoftImg}
                  alt="Microsoft"
                  width="14"
                  height="14"
                  className="w-full h-full"
                />
              </div>
              <span className="text-[16px] font-medium">Microsoft</span>
            </button>
          </div>

          <div className="flex items-center mb-3">
            <hr className="h-0 border-b-[0px] border-solid border-[#7780A0] flex-grow" />
            <p className="mx-4 text-[14px] text-[rgb(85,85,85)]">
              or continue with email
            </p>
            <hr className="h-0 border-b-[0px] border-solid border-[#7780A0] flex-grow" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-[500] text-[rgb(85,85,85)] mb-1">
                Full Name
              </label>
              <input
                type="name"
                className={`w-full px-2 py-2 ${errors.name?"border-red-400":"border-gray-300"} border text-[rgb(85,85,85)]  text-[0.8125rem] outline-none transition-all`}
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Full Name"
              />
          
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-[rgb(85,85,85)]">Phone Number</label>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={setPhone}
                inputClass={`w-full border ${errors.phone?"border-red-400":"border-gray-300"} rounded px-3 py-2 text-sm text-[rgb(85,85,85)] outline-none `}
                buttonClass="bg-white border-r border-gray-300"
              />
            </div>
            <div>
              <label className="block text-[13px] font-[500] text-[rgb(85,85,85)] mb-1">
                Email Address
              </label>
              <input
                type="email"
                className={`w-full px-2 py-2 border ${errors.email?"border-red-400":"border-gray-300"} text-[rgb(85,85,85)]  text-[0.8125rem] outline-none transition-all`}
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
              />
             
            </div>

            <div>
              <label className="block text-[13px] font-[500] text-[rgb(85,85,85)] mb-1">
                Password
              </label>
              <div className="relative w-full " id="not-clickable">
                
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className={`w-full h-[38px] px-2 border ${errors.password?"border-red-400":"border-gray-300"} outline-none text-[rgb(85,85,85)] text-[0.8125rem] tracking-wide `}
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password-input"
                  data-tooltip-id="password-tooltip"
                />
                <div
                  className="absolute top-[10px] right-[10px] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? eyeOpen : eyeHide}
                    alt="password show/hide icon"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
               <Tooltip id="password-tooltip" place="top" effect="solid">
    Password must include:
    <ul className="list-disc pl-4">
      <li>At least 10 characters</li>
      <li>At least one number</li>
      <li>One lowercase and one uppercase letter</li>
      <li>One special character (@_$!%*#?&)</li>
      <li>No character or number repeated more than twice</li>
    </ul>
  </Tooltip>
            </div>

            <div className="flex items-center text-sm text-[rgb(85,85,85)]">
            <button
                type="button"
                className="w-4 h-4 flex   focus:outline-none"
                onClick={() => setIsChecked(!isChecked)}
              >
                <img alt="checkbox" src={isChecked ? select : unselect} className="w-4 h-4" />
              </button>
              <div className=" flex flex-wrap items-center ml-2 lg:ml-1">
                I accept the
                <Link
                  to="https://survey2connect.com/terms-of-services/"
                  target="_blank"
                  rel="noreferrer"
                  className="  pl-1 font-medium"
                >
                  Terms of Services &  Services
                 
                </Link>
                <Link
                  to="https://survey2connect.com/terms-of-services/"
                  target="_blank"
                  rel="noreferrer"
                  className="  pl-1 font-medium"
                >
                Privacy Policy
                 
                </Link>

              </div>
            </div>

            <button
              type="submit"
              className="w-full text-[14px] bg-[#422ff0] text-white font-medium py-2.5 transition-colors cursor-pointer"
            >
              Create  Account
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-[rgb(85,85,85)]">
            Already have an account?
            <Link to="/">
              <span className="text-[#422ff0] text-[14px] font-[400] ml-1 cursor-pointer">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
                  <ToastContainer position="bottom-right" autoClose={3000} />
      
    </div>
  );
};

export default CreateAccount;
