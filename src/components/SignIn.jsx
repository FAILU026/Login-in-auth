import React, { useState } from "react";
import googleImg from "../assets/google-icon.svg";
import microsoftImg from "../assets/microsoft-icon.svg";
import eyeHide from "../assets/eye-hide-icon.svg";
import eyeOpen from "../assets/eye-visible-icon.svg";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";



const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  
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


  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return "Invalid email format";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (errorMsg) {
      toast.error(errorMsg);
    }
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return "Password is required";
    } else if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    if (errorMsg) {
      toast.error(errorMsg);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });

    if (emailError) toast.error(emailError);
    if (passwordError) toast.error(passwordError);

    if (!emailError && !passwordError) {
      toast.success("Logged in successfully!");
      console.log("Form submitted:", { email, password });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <div className="h-[100vh]  flex items-center justify-center p-4 Login">
        <div className="max-w-lg w-full bg-white Login-Container ">
          <div className="login-title">
            <h2 className="text-[1.375rem] font-medium text-[rgb(85,85,85)]  text-center">
              Log in to your account
            </h2>
            <p className="text-center mb-4 text-[0.8125rem] font-[400] text-[rgb(85,85,85)]">
              Welcome back! Select method to log in
            </p>
          </div>

          <div className="flex gap-4 mb-2.5">
            <button
              type="button"
              title="Google"
              onClick={login}
              className="flex items-center justify-center gap-1 w-full h-[35px] bg-white text-[#555] border-none outline-none rounded-[2px] px-2 cursor-pointer  text-[1rem]"

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
              className="flex items-center justify-center gap-1 w-full h-[35px] bg-white text-[#555] border-none outline-none rounded-[2px] px-2 cursor-pointer  text-[1rem]"
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
          <form  onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-[500] text-[rgb(85,85,85)] mb-1">
                Email Address
              </label>
              <input
                type="email"
                className={`w-full px-2 py-2 border ${errors.email ? "border-red-400" : "border-gray-300"} text-[rgb(85,85,85)]  text-[0.8125rem] outline-none transition-all`}
                value={email || ""}
                onChange={handleEmailChange}
                placeholder="Enter Email Address"
              />
            </div>

            <div>
              <label className="block text-[13px] font-[500] text-[rgb(85,85,85)] mb-1">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className={`w-full px-2 py-2 border ${errors.password ? "border-red-400" : "border-gray-300"} text-[rgb(85,85,85)] text-[0.8125rem] outline-none transition-all`}
                  value={password || ""}
                  onChange={handlePasswordChange}
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
            </div>
            <div className="flex items-center justify-between">
              <Link to='/sso'>
              <span className="  text-[14px] text-[rgb(85,85,85)] cursor-pointer">
                Login with SSO
              </span>
              </Link>
              <Link to='/forgot'>
              <p className="text-sm text-[rgb(85,85,85)] cursor-pointer">Forgot Password?</p>
              </Link>
            </div>

            <button  type="submit" className="w-full text-[14px] bg-[#422ff0] text-white font-medium py-2.5 transition-colors cursor-pointer">
              Log In
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-[rgb(85,85,85)]">
            Don't have an account?
            <Link to='/create-account'>
            <span className="text-[#422ff0] text-[14px] font-[400] ml-1 cursor-pointer">
              Create Account
            </span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />

    </div>
  );
};

export default SignIn;
