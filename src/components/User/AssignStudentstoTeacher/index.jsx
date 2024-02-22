import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const AssignStudentstoTeacher = () => {
  const { id } = useParams();
  const [teacherId, setTeacherId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAssignTeacher = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found.");
        setLoading(false);
        return;
      }

      const response = await axios.patch(
        baseUrl + `/api/users/${id}/assign-teacher`,
        { teacher_id: teacherId },
        {
          headers: {
            token: token,
          },
        }
      );

      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error("Error assigning teacher:", error);
      setErrorMessage("Failed to assign teacher.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setTeacherId(event.target.value);
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleAssignTeacher} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="teacherId" className="block mb-1">
            Teacher ID:
          </label>
          <input
            type="text"
            id="teacherId"
            value={teacherId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Assigning..." : "Assign Teacher"}
        </button>
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AssignStudentstoTeacher;
