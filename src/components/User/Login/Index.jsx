import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../Loader";
import { baseUrl } from "../../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [loginStatus, setLoginStatus] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(baseUrl + "/api/login", {
        email,
        password,
        role_id: roleId,
      });

      const { data, token } = response.data;

      // Check the structure of the actual response to make sure 'data' exists
      if (data) {
        localStorage.setItem("token", token);

        setLoginStatus({
          success: true,
          message: "Login successful!",
        });
        console.log(token);
        // Redirect the user to the home page
        navigate("/users-list");
      } else {
        setLoginStatus({
          success: false,
          message: "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      // Log the complete error response
      console.log("Error response:", error.response);

      setLoginStatus({
        success: false,
        message: "Login failed. Please check your credentials.",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 z-[999px]">
        <div className="max-w-md w-full  space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-3"
            />

            <input
              type="text"
              id="roleId"
              name="roleId"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              placeholder="Role ID"
              className=" w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-3"
            />

            <button
              type="submit"
              className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 relative"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>

          <div>
            <p>
              Do not have an account?
              <Link to={"/signup"}>
                <span className="text-blue-500">Sign Up</span>
              </Link>
            </p>
          </div>
          <div>
            <p>
              <Link to={"/forget-password"}>
                <span className="text-blue-500">Forgot Password</span>
              </Link>
            </p>
          </div>

          {/* Display the login status message */}
          {loginStatus.message && (
            <div
              className={`mt-4 text-center text-sm ${
                loginStatus.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {loginStatus.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
