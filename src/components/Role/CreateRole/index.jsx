// CreateClass.js
import React, { useState } from "react";
import axios from "axios";

const CreateRole = () => {
  const [RoleName, setRoleName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateRole = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/role",
        { role_name: RoleName },
        {
          headers: {
            token: token,
          },
        }
      );

      setSuccessMessage("Role created successfully!");
      setErrorMessage("");
      setRoleName("");
    } catch (error) {
      console.error("Error creating role:", error);
      setErrorMessage(
        error.response?.data?.error ||
          "Failed to create role. Please try again later."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Create Role</h1>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Role Name"
          value={RoleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="rounded-l-lg px-4 py-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        />
        <button
          onClick={handleCreateRole}
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

export default CreateRole;
