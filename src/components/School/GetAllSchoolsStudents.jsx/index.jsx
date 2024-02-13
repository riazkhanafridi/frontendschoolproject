import React, { useEffect, useState } from "react";
import axios from "axios";

const GetAllSchoolsStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/students", {
          headers: {
            token: token,
          },
        });

        const { status, data } = response.data;

        if (status === "success") {
          setStudents(data.users);
        } else {
          throw new Error("Error fetching students");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(
          error.response?.data?.message ||
            "Error fetching students. Please try again later."
        );
      }
    };

    getStudents();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Students List</h2>
      {error ? (
        <p>{error}</p>
      ) : students && students.length > 0 ? (
        <ul className="list-disc pl-4">
          {students.map((student) => (
            <li key={student._id} className="mb-2">
              <div className="bg-gray-200 p-4 rounded-md">
                <p className="font-bold">{student.name}</p>
                <p>Email: {student.email}</p>
                <p>Role: {student.role_id?.role_name}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default GetAllSchoolsStudents;
