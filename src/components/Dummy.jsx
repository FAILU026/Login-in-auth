import React, { useState } from "react";
const Dummy = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: ""});

  const validateForm = () => {
    let newErrors = { email: ""};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", { email });
      setEmail('')
    }
  };

  return (
    <div>
      <div className="min-h-screen  flex items-center justify-center p-4 Login">
        <div className="max-w-lg w-full bg-white Login-Container ">
          <div className="login-title">
            <h2 className="text-[1.375rem] font-medium text-[rgb(85,85,85)]  text-center">
            Sign in with SSO
            </h2>
            <p className="text-center mb-4 text-[0.8125rem] font-[400] text-[rgb(85,85,85)]">
            Log in with your Official Account
            </p>
          </div>
          <form  onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-[500] text-[rgb(85,85,85)] mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-2 py-2 border border-gray-300 text-[rgb(85,85,85)]  text-[0.8125rem] outline-none transition-all"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <button  type="submit" className="w-full bg-[#422ff0] text-white font-medium py-2.5 transition-colors cursor-pointer">
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-[rgb(85,85,85)] font-medium">
          Want to go back on <span className=" cursor-pointer hover:underline">Login</span> 
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dummy;
