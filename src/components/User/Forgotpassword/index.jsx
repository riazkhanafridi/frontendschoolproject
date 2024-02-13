import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const baseUrl = "http://localhost:3000";
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(baseUrl + "/api/forget-password", {
        email,
      });

      setStatus("Reset password link sent successfully!");

      // You can redirect the user to another page or perform additional actions here
    } catch (error) {
      console.error("Forgot password error:", error);

      setStatus("Error sending reset password link.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>

      {status && <div className="mb-4 text-green-600">{status}</div>}

      <form onSubmit={handleForgotPassword}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
