import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserTaskSolutions = () => {
  const { id } = useParams();
  const [taskSolutions, setTaskSolutions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserTaskSolutions = async () => {
      setErrorMessage(""); // Clear any previous error messages

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/user-task-solution/${id}`,
          {
            headers: {
              token: token,
            },
          }
        );

        if (response.status === 200) {
          console.log("User's task solutions fetched:", response.data);
          setTaskSolutions(response.data);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user's task solutions:", error);
        setErrorMessage(error.message);
      }
    };

    fetchUserTaskSolutions();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {taskSolutions.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4">User's Task Solutions</h2>
          <ul>
            {taskSolutions.map((taskSolution) => (
              <li key={taskSolution._id}>
                <h3 className="text-xl font-bold">{taskSolution.title}</h3>
                <p>{taskSolution.description}</p>

                {/* Render other task solution details as needed */}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No task solutions found.</p>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default UserTaskSolutions;
