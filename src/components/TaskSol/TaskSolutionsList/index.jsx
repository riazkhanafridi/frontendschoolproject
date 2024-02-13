import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskSolutionsList = () => {
  const [taskSolutions, setTaskSolutions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTaskSolutions = async () => {
      setErrorMessage(""); // Clear any previous error messages

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/getAllTaskSolution",
          {
            headers: {
              token: token,
            },
          }
        );

        if (response.status === 200) {
          console.log("Task solutions fetched:", response.data);
          setTaskSolutions(response.data);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching task solutions:", error);
        setErrorMessage(error.message);
      }
    };

    fetchTaskSolutions();
  }, []);

  const handleDelete = async (solutionId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      await axios.delete(
        `http://localhost:3000/api/assignTaskdeletesolution/${solutionId}`,
        {
          headers: {
            token: token,
          },
        }
      );

      // Filter out the deleted task solution from the taskSolutions state
      setTaskSolutions((prevTaskSolutions) =>
        prevTaskSolutions.filter((solution) => solution._id !== solutionId)
      );
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting task solution:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to delete task solution. Please try again later."
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task Solutions</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-3 px-4 font-semibold uppercase border-b border-gray-200">
              Title
            </th>
            <th className="py-3 px-4 font-semibold uppercase border-b border-gray-200">
              Description
            </th>
            <th className="py-3 px-4 font-semibold uppercase border-b border-gray-200">
              Image
            </th>
            <th className="py-3 px-4 font-semibold uppercase border-b border-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {taskSolutions.map((solution) => (
            <tr key={solution._id} className="border-b border-gray-200">
              <td className="py-3 px-4">{solution.title}</td>
              <td className="py-3 px-4">{solution.description}</td>
              <td className="py-3 px-4">
                {solution.image && (
                  <img
                    src={solution.image}
                    alt="Task Solution"
                    className="max-w-full h-auto"
                  />
                )}
              </td>
              <td className="py-3 px-4">
                <Link
                  to={`/update-sol-task/${solution._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(solution._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskSolutionsList;
