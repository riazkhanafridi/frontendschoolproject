import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";

const CreateComment = () => {
  const [comment, setComment] = useState("");
  const [task_sol_id, setTasksol] = useState("");
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
        baseUrl + "/api/comment",
        { text: comment, task_sol_id },
        {
          headers: {
            token: token,
          },
        }
      );

      setComment("");
      setTasksol("");
      setSuccessMessage("Comment created successfully.");
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("");
      setErrorMessage(
        error.response?.data?.message || "Failed to create comment."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold ">Comment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="comment" className="block font-bold mb-2">
            Comment
          </label>
          <input
            type="text"
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="task_sol_id" className="block font-bold mb-2">
            Task_sol_id
          </label>
          <input
            type="text"
            name="task_sol_id"
            id="task_sol_id"
            value={task_sol_id}
            onChange={(e) => setTasksol(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Comment
        </button>
      </form>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
    </div>
  );
};

export default CreateComment;
