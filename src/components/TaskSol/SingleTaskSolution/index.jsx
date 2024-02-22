import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const SingleTaskSolution = () => {
  const { id } = useParams();
  const [taskSolution, setTaskSolution] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTaskSolution = async () => {
      setErrorMessage(""); // Clear any previous error messages

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(
          baseUrl + `/api/getSingleTaskSolution/${id}`,
          {
            headers: {
              token: token,
            },
          }
        );

        if (response.status === 200) {
          console.log("Task solution fetched:", response.data);
          setTaskSolution(response.data.data);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching task solution:", error);
        setErrorMessage(error.message);
      }
    };

    fetchTaskSolution();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {taskSolution ? (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Title:{taskSolution.title}
          </h2>
          <p>
            <strong>description:</strong>
            {taskSolution.description}
          </p>
          <div className="mt-4">
            <p>
              <strong>Submitted By:</strong> {taskSolution.std_id.name}
            </p>
            <p>
              <strong>Email:</strong> {taskSolution.std_id.email}
            </p>

            <p>
              <strong>Status:</strong> {taskSolution.status}
            </p>
            <p>
              <strong>Solved At:</strong> {taskSolution.solved_at}
            </p>
            <p>
              <strong>Image:</strong> {taskSolution.image}
            </p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default SingleTaskSolution;
