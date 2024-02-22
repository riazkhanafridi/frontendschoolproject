import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const UpdateAward = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    award: "",
    level: "",
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("award", formData.award);
      formDataToSend.append("level", formData.level);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.put(
        baseUrl + `/api/award/${id}`,
        formDataToSend,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating award:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to update award. Please try again later."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Award</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="award" className="block font-bold mb-2">
            Award Name
          </label>
          <input
            type="text"
            name="award"
            id="award"
            value={formData.award}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="level" className="block font-bold mb-2">
            Level
          </label>
          <input
            type="text"
            name="level"
            id="level"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-bold mb-2">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            className="py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default UpdateAward;
