import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetAllSchools = () => {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState("");

  const getSchoolsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getallschools/",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data); // Check the API response data

      const { status, data } = response.data;

      if (status === "success") {
        setSchools(data);
      } else {
        throw new Error("Error fetching schools");
      }
    } catch (error) {
      console.error("Error fetching schools:", error);
      setError(
        error.response?.data?.message ||
          "Error fetching schools. Please try again later."
      );
    }
  };

  const handleDelete = async (schoolId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }

      await axios.delete(`http://localhost:3000/api/deleteschool/${schoolId}`, {
        headers: {
          token: token,
        },
      });

      // Filter out the deleted school from the schools state
      setSchools((prevSchools) =>
        prevSchools.filter((school) => school._id !== schoolId)
      );
      setError("");
    } catch (error) {
      console.error("Error deleting school:", error);
      setError(
        error.response?.data?.message ||
          "Failed to delete school. Please try again later."
      );
    }
  };

  useEffect(() => {
    getSchoolsData();
  }, []);

  return (
    <div className="container mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4">School List</h2>
      {error ? (
        <p>{error}</p>
      ) : schools && schools.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 text-center">
          <thead>
            <tr>
              <th className="py-3 px-4 font-semibold uppercase border-b border-gray-200">
                School
              </th>
              <th className="py-3 px-4 font-semibold uppercase border-b border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school._id} className="border-b border-gray-200">
                <td className="py-3 px-4">{school.school_name}</td>
                <td className="py-3 px-4">
                  <Link
                    to={`/update-school/${school._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(school._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Schools found.</p>
      )}
    </div>
  );
};

export default GetAllSchools;
