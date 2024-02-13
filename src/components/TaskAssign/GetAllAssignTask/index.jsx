import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetAllAssignTasks = () => {
  const [assignTasks, setAssignTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAssignTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/getallassignTask",
          {
            headers: {
              token: token,
            },
          }
        );

        setAssignTasks(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching assign tasks:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch assign tasks. Please try again later."
        );
      }
    };

    fetchAssignTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      await axios.delete(
        `http://localhost:3000/api/assignTaskdelete/${taskId}`,
        {
          headers: {
            token: token,
          },
        }
      );

      // Filter out the deleted assigned task from the assignTasks state
      setAssignTasks((prevAssignTasks) =>
        prevAssignTasks.filter((assignTask) => assignTask._id !== taskId)
      );
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting assign task:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to delete assign task. Please try again later."
      );
    }
  };

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (assignTasks.length === 0) {
    return <p>No assign tasks found.</p>;
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl ">All Assigned Tasks</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-3 px-4 font-semibold uppercase border-b border-gray-200">
              User
            </th>
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
          {assignTasks.map((assignTask) => (
            <tr key={assignTask._id} className="border-b border-gray-200">
              <td className="py-3 px-4">{assignTask.std_id.name}</td>
              <td className="py-3 px-4">{assignTask.task_id.title}</td>
              <td className="py-3 px-4">{assignTask.task_id.description}</td>
              <td className="py-3 px-4">
                <Link
                  to={`/update-assign-task/${assignTask._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(assignTask._id)}
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

export default GetAllAssignTasks;
