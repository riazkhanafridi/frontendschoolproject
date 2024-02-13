import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TaskSolutionApproval = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  const handleApproveTaskSolution = async () => {
    setErrorMessage(""); // Clear any previous error messages

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/api/approved-task-solution/${id}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Task solution approved successfully");
        // Handle any necessary UI updates or notifications
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error approving task solution:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleApproveTaskSolution}
      >
        Approve Task Solution
      </button>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default TaskSolutionApproval;
