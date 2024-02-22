import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const GetSingleAssignAward = () => {
  const { id } = useParams();
  const [award, setAward] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAward = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found.");
          return;
        }

        const response = await axios.get(
          baseUrl + `/api/getSingleAssignAward/${id}`,
          {
            headers: {
              token: token,
            },
          }
        );

        setAward(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching award:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch award. Please try again later."
        );
        setAward(null);
      }
    };

    fetchAward();
  }, [id]);

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (!award) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4">
          <p className="text-lg text-gray-600 mb-4 ">
            Award ID:{award.award_id}
          </p>

          <p className="text-sm text-gray-500">User ID: {award.user_id}</p>
        </div>
      </div>
    </div>
  );
};

export default GetSingleAssignAward;
