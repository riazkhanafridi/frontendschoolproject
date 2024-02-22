import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const GetRejectTask = () => {
  const { id } = useParams();
  const [taskSolutions, setTaskSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserApprovedTaskSolutions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found.");
        }
        const response = await axios.get(
          baseUrl + `/api/rejected-task-solution/${id}/`,
          {
            headers: {
              token: token,
            },
          }
        );
        console.log("Response data:", response.data); // Check the structure of the response data
        setTaskSolutions(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message); // Adjust error handling to extract the error message from the response
        setLoading(false);
      }
    };

    fetchUserApprovedTaskSolutions();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(taskSolutions)) {
    return <div>Error: Task solutions data is not an array.</div>;
  }

  return (
    <div className="text-2xl ">
      <h2 className="text-center mt-10">User's reject Task Solutions</h2>
      <ul>
        {taskSolutions.map((taskSolution) => (
          <React.Fragment key={taskSolution._id}>
            <li>
              <strong>Title:</strong> {taskSolution.title}
            </li>
            <li>
              <strong>Description:</strong> {taskSolution.description}
            </li>
            {/* Replace "title" and "description" with the appropriate fields from your task solution object */}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default GetRejectTask;
