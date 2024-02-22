import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";

const GetAllUserAssignedTasks = () => {
  const [userAssignedTasks, setUserAssignedTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserAssignedTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(
          baseUrl + "/api/getalluserassignTask",
          {
            headers: {
              token: token,
            },
          }
        );

        setUserAssignedTasks(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching user assigned tasks:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch user assigned tasks. Please try again later."
        );
      }
    };

    fetchUserAssignedTasks();
  }, []);

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (userAssignedTasks.length === 0) {
    return (
      <p className="text-center mt-10">No assigned tasks found for the user.</p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">User Assigned Tasks</h1>
      <ul>
        {userAssignedTasks.map((assignTask) => (
          <li key={assignTask._id} className="mb-4">
            <div className="bg-gray-200 p-4 rounded-md">
              <h3>User: {assignTask.std_id.name}</h3>
              <p>title: {assignTask.task_id.title}</p>
              <p>description: {assignTask.task_id.description}</p>
              {/* Display other assign task details as needed */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUserAssignedTasks;
