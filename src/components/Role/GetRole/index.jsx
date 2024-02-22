// GetAllRoles.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config";

const GetAllRoles = () => {
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(baseUrl + "/api/getallroles", {
          headers: {
            token: token,
          },
        });

        setRoles(response.data.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching roles:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch roles. Please try again later."
        );
      }
    };

    fetchRoles();
  }, []);

  const handleDelete = async (roleId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      await axios.delete(baseUrl + `/api/roledelete/${roleId}`, {
        headers: {
          token: token,
        },
      });

      // Filter out the deleted role from the roles state
      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== roleId));
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting role:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to delete role. Please try again later."
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl mt-10">All Roles</h1>
      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {roles.map((role) => (
            <li key={role._id}>
              {role.role_name}
              <Link
                to={`/update-role/${role._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(role._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2 mb-2 "
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

export default GetAllRoles;
