import React, { useEffect, useState } from "react";
import axios from "axios";

const GetAllSchoolsTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/teachers", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        const { status, data } = response.data;
        console.log(response.data); // Check the API response data

        if (status === "success") {
          setTeachers(data.users);
        } else {
          throw new Error("Error fetching teachers");
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setError(
          error.response?.data?.message ||
            "Error fetching teachers. Please try again later."
        );
      }
    };

    getTeachers();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Teachers List</h2>
      {error ? (
        <p>{error}</p>
      ) : teachers && teachers.length > 0 ? (
        <ul className="list-disc pl-4">
          {teachers.map((teacher) => (
            <li key={teacher._id} className="mb-2">
              <div className="bg-gray-200 p-4 rounded-md">
                <p className="font-bold">{teacher.name}</p>
                <p>Email: {teacher.email}</p>
                <p>Role: {teacher.role_id?.role_name}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No teachers found.</p>
      )}
    </div>
  );
};

export default GetAllSchoolsTeachers;
