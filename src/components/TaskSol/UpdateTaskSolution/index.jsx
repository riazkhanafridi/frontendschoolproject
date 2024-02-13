import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateTaskSolution = () => {
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();
  console.log(id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.patch(
        `http://localhost:3000/api/assignTaskupdatesolution/${id}`,
        formData,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFile(null);
      const { message } = response.data;
      setSuccessMessage(message);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating task solution:", error);
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        "Failed to update a task solution. Please try again later.";

      setErrorMessage(errorMessage);
      setSuccessMessage("");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update AssignTask</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            className="w-full"
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Task solution
        </button>
      </form>
    </div>
  );
};

export default UpdateTaskSolution;
