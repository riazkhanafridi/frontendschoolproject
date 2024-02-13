import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TaskSolutionRejection = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRejectTaskSolution = async () => {
    setErrorMessage(""); // Clear any previous error messages

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/api/reject-task-solution/${id}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Task solution Rejected successfully");
        // Handle any necessary UI updates or notifications
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error Reject task solution:", error);
      setSuccessMessage("Task solution Rejected:");
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleRejectTaskSolution}
      >
        Reject Task Solution
      </button>
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default TaskSolutionRejection;
