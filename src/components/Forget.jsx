import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Forget = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: ""});

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
     const handleSubmit = (e) => {
        e.preventDefault();
        const emailError = validateEmail(email);  
        setErrors({ email: emailError });
    
        if (emailError) toast.error(emailError);
    
        if (!emailError ) {
          toast.success("Logged in successfully!");
          console.log("Form submitted:", { email, password });
          setEmail("");
        }
      };
  return (
    <div>
      <div className="h-[100vh] flex items-center justify-center p-4 Login">
        <div className="max-w-lg w-full bg-white Login-Container ">
          <div className="login-title">
            <h2 className="text-[1.375rem] font-medium text-[rgb(85,85,85)]  text-center">
            Forgot Password?
            </h2>
            <p className="text-center mb-4 text-[0.8125rem] font-[400] text-[rgb(85,85,85)]">
            No worries, we'll send you reset instructions
            </p>
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
            <button  type="submit" className="w-full bg-[#422ff0] text-[14px] text-white font-medium py-[6px] transition-colors cursor-pointer">
              Reset Password
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-[rgb(85,85,85)] font-medium">
          Want to go back on 
          <Link to='/'>
          <span className=" cursor-pointer hover:underline pl-1">Login</span> 
          </Link>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />

    </div>
  );
};

export default Forget;
