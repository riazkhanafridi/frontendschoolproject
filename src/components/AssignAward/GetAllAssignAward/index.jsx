import React, { useEffect, useState } from "react";
import axios from "axios";

const GetAllAssignAwards = () => {
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

        const response = await axios.get(
          `http://localhost:3000/api/assignaward`,
          {
            headers: {
              token: token,
            },
          }
        );

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

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (!Array.isArray(awards) || awards.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-4">All Assign Awards</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Award ID</th>
            <th className="px-4 py-2">User ID</th>
          </tr>
        </thead>
        <tbody>
          {awards.map((award) => (
            <tr key={award._id}>
              <td className="border px-4 py-2">{award.award_id}</td>
              <td className="border px-4 py-2">{award.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllAssignAwards;
