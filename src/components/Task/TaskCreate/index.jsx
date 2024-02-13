import React, { useState } from "react";
import axios from "axios";

const TaskCreate = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/task",
        task,
        {
          headers: {
            token: token,
          },
        }
      );

      console.log("Task created:", response.data);
      setSuccessMessage("task created successfully!");
      setErrorMessage("");

      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., display an error message
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        {/* Add other input fields for additional properties */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Task
        </button>
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default TaskCreate;
