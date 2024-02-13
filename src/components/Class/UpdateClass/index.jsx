import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateClass = () => {
  const [classData, setClassData] = useState({ class_name: "" });
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
      const response = await axios.patch(
        `http://localhost:3000/api/classupdate/${id}`,
        classData,
        {
          headers: {
            token: token,
          },
        }
      );
      setClassData({ class_name: "" });

      const { message } = response.data;

      setSuccessMessage(message);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating class:", error);
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        "Failed to update class. Please try again later.";

      setErrorMessage(errorMessage);
      setSuccessMessage("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Class</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Class Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="class_name"
            id="class_name"
            value={classData.class_name || ""}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Class
        </button>
      </form>
    </div>
  );
};

export default UpdateClass;
