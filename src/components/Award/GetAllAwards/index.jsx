import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetAllAwards = () => {
  const [awards, setAwards] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/award", {
          headers: {
            token: token,
          },
        });

        setAwards(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching awards:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch awards. Please try again later."
        );
        setAwards([]);
      }
    };

    fetchAwards();
  }, []);

  const handleDelete = async (awardId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        return;
      }

      await axios.delete(`http://localhost:3000/api/award/${awardId}`, {
        headers: {
          token: token,
        },
      });

      setAwards((prevAwards) =>
        prevAwards.filter((award) => award._id !== awardId)
      );
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting award:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to delete award. Please try again later."
      );
    }
  };

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (!Array.isArray(awards) || awards.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">All Awards</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Award</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {awards.map((award) => (
            <tr key={award._id}>
              <td className="border px-4 py-2">{award.award}</td>
              <td className="border px-4 py-2">{award.level}</td>
              <td className="border px-4 py-2">
                <img
                  src={award.image}
                  alt={award.award}
                  className="w-full h-auto"
                />
              </td>
              <td className="border px-4 py-2">{award.user_id}</td>
              <td className="border px-4 py-2">
                <div className="flex">
                  <Link
                    to={`/update-award/${award._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(award._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllAwards;
