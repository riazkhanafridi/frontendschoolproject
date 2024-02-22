// ResetPassword.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../../config";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");

  const { token } = useParams(); // Use useParams to get the token from the URL
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        baseUrl + `/api/reset-password/${token}`,
        { newPassword }
      );
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      setStatus("Failed to reset password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>

      {status && <div className="mb-4 text-green-600">{status}</div>}

      <form onSubmit={handleResetPassword}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            New Password:
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
