// GetAllClasses.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config";

const GetAllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(baseUrl + "/api/getallclass", {
          headers: {
            token: token,
          },
        });

        setClasses(response.data.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching classes:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch classes. Please try again later."
        );
      }
    };

    fetchClasses();
  }, []);

  const handleDelete = async (classId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      await axios.delete(baseUrl + `/api/classdelete/${classId}`, {
        headers: {
          token: token,
        },
      });

      // Filter out the deleted class from the classes state
      setClasses((prevClasses) =>
        prevClasses.filter((classItem) => classItem._id !== classId)
      );
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting class:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to delete class. Please try again later."
      );
    }
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl">All Classes</h1>
      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem._id}>
              {classItem.class_name}
              <Link
                to={`/update-class/${classItem._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(classItem._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2 mb-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetAllClasses;
