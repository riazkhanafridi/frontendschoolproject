import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config";

const GetAllComments = () => {
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(baseUrl + "/api/getallcomments", {
          headers: {
            token: token,
          },
        });

        setComments(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching comments:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch comments. Please try again later."
        );
        setComments([]);
      }
    };

    fetchComments();
  }, []);

  const handleDelete = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      await axios.delete(baseUrl + `/api/deletecomment/${commentId}`, {
        headers: {
          token: token,
        },
      });

      // Filter out the deleted comment from the comments state
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting comment:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to delete comment. Please try again later."
      );
    }
  };

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (!Array.isArray(comments) || comments.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Get All Comments</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-3 px-4 font-semibold uppercase border-b border-gray-200">
              Comments
            </th>
            <th className="py-3 px-4 font-semibold uppercase border-b border-gray-200">
              Task_sol_Id
            </th>
            <th className="py-3 px-4 font-semibold uppercase border-b border-gray-200">
              User ID
            </th>
            <th className="py-3 px-4 font-semibold uppercase border-b border-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment._id} className="border-b border-gray-200">
              <td className="py-3 px-4">{comment.text}</td>
              <td className="py-3 px-4">{comment.task_sol_id}</td>
              <td className="py-3 px-4">{comment.user_id}</td>
              <td className="py-3 px-4">
                <Link
                  to={`/update-comment/${comment._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2 m-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2 m-4"
                >
                  Delete
                </button>
              </td>
              <Link
                to={`/get-single-comment/${comment._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2 m-4"
              >
                commentDetail
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllComments;
