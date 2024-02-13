import React, { useState } from "react";
import axios from "axios";

const AssignTask = () => {
  const [classId, setClassId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      await axios.post(
        "http://localhost:3000/api/assignTask",
        {
          class_id: classId,
          task_id: taskId,
          school_id: schoolId,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      setErrorMessage("");
      alert("Task assigned successfully!");
      // Clear form fields
      setClassId("");
      setTaskId("");
      setSchoolId("");
    } catch (error) {
      console.error("Error assigning task:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to assign task. Please try again later."
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4 text-center">Assign Task</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="classId" className="block mb-1">
            Class ID:
          </label>
          <input
            type="text"
            id="classId"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="taskId" className="block mb-1">
            Task ID:
          </label>
          <input
            type="text"
            id="taskId"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="schoolId" className="block mb-1">
            School ID:
          </label>
          <input
            type="text"
            id="schoolId"
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default AssignTask;
