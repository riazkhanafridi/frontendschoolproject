// GetTaskById.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const GetSingleTask = () => {
  const [task, setTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchTaskById = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(baseUrl + `/api/getSingleTask/${id}`, {
          headers: {
            token: token,
          },
        });

        setTask(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching task:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch task. Please try again later."
        );
      }
    };

    fetchTaskById();
  }, [id]);

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Task Details</h1>
      <div className="bg-gray-200 p-4 rounded-md">
        <h3>Title: {task.title}</h3>
        <p>Description: {task.description}</p>
        {/* Display other task details as needed */}
      </div>
    </div>
  );
};

export default GetSingleTask;
