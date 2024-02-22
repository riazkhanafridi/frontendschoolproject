import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config";

const GetAllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(baseUrl + "/api/getalltasks", {
          headers: {
            token: token,
          },
        });

        setTasks(response.data.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch tasks. Please try again later."
        );
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      await axios.delete(baseUrl + `/api/deletetask/${taskId}`, {
        headers: {
          token: token,
        },
      });

      // Filter out the deleted task from the tasks state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting task:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to delete task. Please try again later."
      );
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl">All Tasks</h1>
      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : tasks.length > 0 ? (
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b border-gray-200">
                <td className="py-3 px-4">{task.title}</td>
                <td className="py-3 px-4">{task.description}</td>
                <td className="py-3 px-4">
                  <Link
                    to={`/update-task/${task._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/get-single-task/${task._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Task Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default GetAllTasks;
