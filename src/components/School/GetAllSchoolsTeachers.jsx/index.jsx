import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config";

const GetAllSchoolsTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const response = await axios.get(baseUrl + "/api/teachers", {
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
    <div className="container mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Teachers List</h2>
      {error ? (
        <p>{error}</p>
      ) : teachers && teachers.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="border py-2 px-4">Name</th>
              <th className="border py-2 px-4">Email</th>
              <th className="border py-2 px-4">Role</th>
              <th className="border py-2 px-4">
                Get students Assign to Teacher
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td className="border py-2 px-4 font-bold">{teacher.name}</td>
                <td className="border py-2 px-4">{teacher.email}</td>
                <td className="border py-2 px-4">
                  {teacher.role_id?.role_name}
                </td>
                <td className="border py-5 px-4">
                  <Link
                    to={`/get-stu-assignt-to-teacher/${teacher._id}`}
                    className="bg-green-900 hover:bg-black text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Get students
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No teachers found.</p>
      )}
    </div>
  );
};

export default GetAllSchoolsTeachers;
