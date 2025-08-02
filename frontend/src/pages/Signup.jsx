import React, { useState } from "react";
import { toaster } from "../components/ui/toaster";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Facebook, Chrome } from "lucide-react";

// Mock components and functions for demonstration

// Mock logo - replace with your actual logo import
//const logo = "https://via.placeholder.com/400x400/4ade80/ffffff?text=LOGO";

function Signup() {
  const [name, setname] = useState("");
  const [show, setshow] = useState(false);
  const [email, setemail] = useState("");
  const [confirmpassword, setconfirm] = useState("");
  const [password, setpass] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleclick = () => setshow(!show);

  const submithandler = async (e) => {
    e.preventDefault();
    setloading(true);

    if (!name || !email || !password || !confirmpassword) {
      toaster.create({
        title: "All the fields required",
        description: "Please fill all the fields",
        type: "info",
        duration: 5000,
        closable: true,
      });
      setloading(false);
      return;
    }

    if (password !== confirmpassword) {
      toaster.create({
        title: "Incorrect Password",
        description: "Password doesnot match",
        type: "info",
        duration: 5000,
        closable: true,
      });
      setloading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/auth/signup",
        { name, email, password },
        config
      );
      toaster.create({
        description: "Signup successful",
        type: "info",
        duration: 5000,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      navigate("/Homepage");
    } catch (error) {
      toaster.create({
        title: "Error occured",
        description: error.response.data.message || "something went wrong",
        type: "info",
        duration: 5000,
      });
      setloading(false);
    }
  };

  // const handleSocialLogin = (provider) => {
  //   console.log(`Login with ${provider}`);
  //   // Handle social login here
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Side - Welcome Section with Logo */}
        <div className="flex-1 bg-gradient-to-br from-teal-400 to-green-500 p-12 text-white relative overflow-hidden flex flex-col justify-center items-center">
          <div className="relative z-10 text-center">
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-4">Welcome to Title</h1>
              <p className="text-xl opacity-90 leading-relaxed">
                To keep connected with us please
                <br />
                login with your personal info
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 right-0 opacity-20">
            <div className="w-64 h-64 bg-white rounded-full -mb-32 -mr-32"></div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <div className="max-w-lg mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">SIGN-UP</h2>

              {/* Social Login Buttons */}
              {/* <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => handleSocialLogin("facebook")}
                  className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <Chrome className="w-5 h-5 text-red-500" />
                </button>
                <button
                  onClick={() => handleSocialLogin("linkedin")}
                  className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <div className="w-5 h-5 bg-blue-700 rounded"></div>
                </button>
              </div> */}

              <p className="text-gray-500 text-base mb-6">
                Please provide your details below.
              </p>
            </div>

            <div className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all text-gray-700 bg-white"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all text-gray-700 bg-white"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setpass(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all text-gray-700 bg-white"
                />
                <button
                  type="button"
                  onClick={handleclick}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {show ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={show ? "text" : "password"}
                  placeholder="Confirm the password"
                  value={confirmpassword}
                  onChange={(e) => setconfirm(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all text-gray-700 bg-white"
                />
                <button
                  type="button"
                  onClick={handleclick}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {show ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={submithandler}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-teal-400 to-green-500 text-white font-semibold py-4 px-6 rounded-full hover:from-teal-500 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing Up..." : "Sign-Up"}
              </button>

              <div className="text-center mt-6">
                <span className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-teal-500 hover:text-teal-600 font-semibold transition-colors cursor-pointer"
                  >
                    Login here
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
