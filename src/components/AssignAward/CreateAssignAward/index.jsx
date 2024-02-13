import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateAssignAward = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const createAssignAward = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }
        const response = await axios.post(
          `http://localhost:3000/api/assignaward`,
          {},

          {
            headers: {
              token: token,
            },
          }
        );

        setMessage(response.data.message);
        setErrorMessage("");
      } catch (error) {
        console.error("Error:", error);
        setMessage(
          error.response?.data?.message || "Failed to create assign award."
        );
      }
    };

    createAssignAward();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 mt-8">
      <h1 className="text-3xl font-bold mb-4">Create Assign Award</h1>
      <p>{message}</p>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default CreateAssignAward;
