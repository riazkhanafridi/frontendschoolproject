import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const UserDetail = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getStudentInfo = async () => {
      try {
        if (!id) {
          setError("No student ID provided.");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");
        const config = {
          headers: {
            token: token,
          },
        };

        const response = await axios.get(
          baseUrl + `/api/getuserinfo/${id}`,
          config
        );

        console.log(response.data); // Log the API response data
        if (response.data.status === "success") {
          setStudent(response.data.user);
          setLoading(false);
        } else {
          setError("Failed to fetch student info.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching student info:", error);
        setError("Error fetching student info. Please try again later.");
        setLoading(false);
      }
    };

    getStudentInfo();
  }, [id]);

  console.log(student); // Log the student object

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!student) {
    return <p>No student found.</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Student Information</h2>
      <div className="bg-gray-200 p-4 rounded-md">
        <p className="font-bold">{student.name}</p>
        <p>Email: {student.email}</p>
        <p>Role: {student.role_id?.role_name}</p>
        <p>School: {student.school_id?.school_name}</p>
        <p>Class: {student.class_id?.class_name}</p>
        <p>Mobile No: {student.mobile_no}</p>
      </div>
    </div>
  );
};

export default UserDetail;
