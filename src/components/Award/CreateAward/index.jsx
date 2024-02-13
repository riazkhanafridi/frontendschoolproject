import React, { useState } from "react";
import axios from "axios";

const CreateAward = () => {
  const [image, setImage] = useState(null);
  const [user_id, setUserId] = useState("");
  const [level, setLevel] = useState("");
  const [award, setAward] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleAwardChange = (e) => {
    setAward(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("user_id", user_id);
    formData.append("level", level);
    formData.append("award", award);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/api/award",
        formData,
        {
          headers: {
            token: token,
          },
        }
      );

      setSuccessMessage("Award created successfully!");
      setErrorMessage("");
      setUserId("");
      setLevel("");
      setAward("");
      setImage(null);
    } catch (error) {
      console.error("Error creating award:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to create award. Please try again later."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Award</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="image" className="block font-medium mb-1">
            Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="user_id" className="block font-medium mb-1">
            User ID:
          </label>
          <input
            type="text"
            id="user_id"
            value={user_id}
            onChange={handleUserIdChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="level" className="block font-medium mb-1">
            Level:
          </label>
          <input
            type="text"
            id="level"
            value={level}
            onChange={handleLevelChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="award" className="block font-medium mb-1">
            Award:
          </label>
          <input
            type="text"
            id="award"
            value={award}
            onChange={handleAwardChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Create Award
        </button>
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CreateAward;
