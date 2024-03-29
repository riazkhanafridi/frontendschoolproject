import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../../config";

const GetAllSchoolAssignedTask = () => {
  const { id } = useParams();
  const [schoolAssignedTasks, setSchoolAssignedTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSchoolAssignedTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(
          baseUrl + `/api/getallschoolassignTask/${id}`,

          {
            headers: {
              token: token,
            },
          }
        );
        console.log(response.data);
        setSchoolAssignedTasks(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching school assigned tasks:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch school assigned tasks. Please try again later."
        );
      }
    };

    fetchSchoolAssignedTasks();
  }, []);

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (schoolAssignedTasks.length === 0) {
    return <p>No assigned tasks found for the school.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">School Assigned Tasks</h1>
      <ul>
        {schoolAssignedTasks.map((assignTask) => (
          <li key={assignTask._id} className="mb-4">
            <div className="text-white bg-gray-500 p-4 rounded-md">
              <h3>title: {assignTask.task_id.title}</h3>
              <p>Description: {assignTask.task_id.description}</p>
              {/* Display other assign task details as needed */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllSchoolAssignedTask;
