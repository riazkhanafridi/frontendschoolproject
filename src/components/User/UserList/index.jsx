import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getallusers",
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        console.log(response.data); // Check the API response data

        const { status, data } = response.data;

        if (status === "success") {
          setUsers(data);
        } else {
          throw new Error("Error fetching users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(
          error.response?.data?.message ||
            "Error fetching users. Please try again later."
        );
      }
    };

    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found.");
      }

      const response = await axios.delete(baseUrl + `/api/delete/${id}`, {
        headers: {
          token: token,
        },
      });

      const { status } = response.data;

      if (status === "success") {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        throw new Error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto mt-16 text-center">
      <h2 className="text-2xl font-bold mb-4 text-white text-center bg-gray-900 ">
        User List
      </h2>
      {error ? (
        <p>{error}</p>
      ) : users && users.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2 ">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>

                <td className="border px-4 py-2 ">
                  <Link
                    to={`/user-update/${user._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/user-detail/${user._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    User Detail
                  </Link>
                  <Link
                    to={`/get-user-task-solutions/${user._id}`}
                    className="dropdown-item bg-green-500 ml-2 py-2 px-4 hover:bg-green-600 rounded"
                  >
                    Get All Users solution task
                  </Link>
                  <Link
                    to={`/get-user-approved-task/${user._id}`}
                    className="dropdown-item bg-green-500 ml-2 py-2 px-4 hover:bg-green-600 rounded"
                  >
                    Get All Users Approve solution task
                  </Link>
                  <Link
                    to={`/get-user-reject-task/${user._id}`}
                    className="dropdown-item bg-green-500 ml-2 py-2 px-4 hover:bg-green-600 rounded"
                  >
                    Get All Users Reject solution task
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
