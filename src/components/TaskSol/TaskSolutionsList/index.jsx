import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config";

const TaskSolutionsList = () => {
  const [taskSolutions, setTaskSolutions] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
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

        const response = await axios.get(baseUrl + "/api/getAllTaskSolution", {
          headers: {
            token: token,
          },
        });

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
  const handleApprove = async (solutionId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      await axios.patch(
        baseUrl + `/api/approved-task-solution/${solutionId}`,
        null,
        {
          headers: {
            token: token,
          },
        }
      );

      // Set the success message after approving the task solution
      setSuccessMessage("Task approved successfully.");
      setErrorMessage("");
    } catch (error) {
      console.error("Error approving task solution:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to approve task solution. Please try again later."
      );
      setSuccessMessage("");
    }
  };
  const handleReject = async (solutionId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      await axios.patch(
        baseUrl + `/api/reject-task-solution/${solutionId}`,
        null,
        {
          headers: {
            token: token,
          },
        }
      );

      // Set the success message after approving the task solution
      setSuccessMessage("Task reject successfully.");
      setErrorMessage("");
    } catch (error) {
      console.error("Error reject task solution:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to reject task solution. Please try again later."
      );
      setSuccessMessage("");
    }
  };

  const handleDelete = async (solutionId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      await axios.delete(
        baseUrl + `/api/assignTaskdeletesolution/${solutionId}`,
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
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Task Solutions</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
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
                <Link
                  to={`/get-single-task-solutions/${solution._id}`}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 ml-1"
                >
                  {" "}
                  get-single-sol
                </Link>

                <button
                  onClick={() => handleApprove(solution._id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(solution._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Reject
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
