import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const RejectTaskSolution = () => {
  // Updated component name to PascalCase
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleApprove = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No token found.");
        return;
      }
      const response = await axios.patch(
        baseUrl + `/api/reject-task-solution/${id}`,
        null,
        {
          headers: {
            token: token,
          },
        }
      );

      setSuccessMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-10">
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}

      <button
        onClick={handleApprove}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={loading}
      >
        Reject Task Solution
      </button>
    </div>
  );
};

export default RejectTaskSolution; // Updated component export
