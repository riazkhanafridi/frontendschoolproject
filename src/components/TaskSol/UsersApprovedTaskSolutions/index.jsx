import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UsersApprovedTaskSolutions = () => {
  const { id } = useParams();
  const [taskSolutions, setTaskSolutions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUsersApprovedTaskSolutions();
  }, [id]);

  const fetchUsersApprovedTaskSolutions = async () => {
    setErrorMessage(""); // Clear any previous error messages

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/user-approved-task-solution/${id}`,
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.status === 200) {
        setTaskSolutions(response.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users' approved task solutions:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      {taskSolutions.map((taskSolution) => (
        <div key={taskSolution._id}>
          <h3>Task Solution ID: {taskSolution._id}</h3>
          <p> title:{taskSolution.title}</p>
          <p> Description:{taskSolution.description}</p>
          <p> Status:{taskSolution.status}</p>
          {/* Render other task solution details */}
        </div>
      ))}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default UsersApprovedTaskSolutions;
