import React, { useState } from "react";
import axios from "axios";

const SubmitTaskSolution = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskAssignId, setTaskAssignId] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("taskAssignId", taskAssignId);
      formData.append("text", text);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        "http://localhost:3000/api/assigntasksolution",
        formData,
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Task Solution submitted:", response.data);

        setSuccessMessage("Task solution submitted successfully:");
        setErrorMessage("");

        // Handle success, e.g., show a success message or redirect to another page
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting task solution:", error);
      setErrorMessage(error.message);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTaskAssignIdChange = (e) => {
    setTaskAssignId(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submit Task Solution</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="text"
            name="title"
            id="title"
            required
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded"
            name="description"
            id="description"
            required
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="taskAssignId">
            Task Assignment ID
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="text"
            name="taskAssignId"
            id="taskAssignId"
            required
            onChange={handleTaskAssignIdChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="text">
            Solution Text
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded"
            name="text"
            id="text"
            required
            onChange={handleTextChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="image">
            Solution Image
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
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit Solution
        </button>
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SubmitTaskSolution;
