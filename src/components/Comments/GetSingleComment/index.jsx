import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const GetSingleComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }
        const response = await axios.get(baseUrl + `/api/comment/${id}`, {
          headers: {
            token: token,
          },
        });

        setComment(response.data.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage(
          error.response?.data?.message || "Failed to fetch comment."
        );
      }
    };

    fetchComment();
  }, [id]);

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (!comment) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Single Comment</h1>
      <p>
        <strong>User:</strong> {comment.user_id.name}
      </p>
      <p>
        <strong>Email:</strong> {comment.user_id.email}
      </p>
      <p>
        <strong>Task Solution ID:</strong> {comment.task_sol_id._id}
      </p>
      <p>
        <strong>Comment:</strong> {comment.text}
      </p>
    </div>
  );
};

export default GetSingleComment;
