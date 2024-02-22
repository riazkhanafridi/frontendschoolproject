// CreateClass.js
import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";

const CreateClass = () => {
  const [className, setClassName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateClass = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      const response = await axios.post(
        baseUrl + "/api/class",
        { class_name: className },
        {
          headers: {
            token: token,
          },
        }
      );

      setSuccessMessage("Class created successfully!");
      setErrorMessage("");
      setClassName("");
    } catch (error) {
      console.error("Error creating class:", error);
      setErrorMessage(
        error.response?.data?.error ||
          "Failed to create class. Please try again later."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Create Class</h1>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="rounded-l-lg px-4 py-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        />
        <button
          onClick={handleCreateClass}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 m-2 px-5 rounded-r-lg"
        >
          Create
        </button>
      </div>
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default CreateClass;
