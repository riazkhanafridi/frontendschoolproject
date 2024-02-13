import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GetSingleAssignTask = () => {
  const { id } = useParams();
  const [assignTask, setAssignTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAssignTask = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/getSingleAssignTask/${id}`,
          {
            headers: {
              token: token,
            },
          }
        );

        setAssignTask(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching assign task:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch assign task. Please try again later."
        );
      }
    };

    fetchAssignTask();
  }, [id]);

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (!assignTask) {
    return <p>Loading assign task...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Single Assign Task</h1>
      <div className="bg-gray-200 p-4 rounded-md">
        <h3>User: {assignTask.std_id.name}</h3>
        <p>title: {assignTask.task_id.title}</p>
        <p>description: {assignTask.task_id.description}</p>
        {/* Display other assign task details as needed */}
      </div>
    </div>
  );
};

export default GetSingleAssignTask;
