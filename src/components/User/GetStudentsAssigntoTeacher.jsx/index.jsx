import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const GetStudentsAssigntoTeacher = () => {
  const { id } = useParams();
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAssignedStudents = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        console.log("Teacher ID:", id);
        const response = await axios.get(
          baseUrl + `/api/getstdassign-teacher/${id}`
        );

        if (response.data.status === "success") {
          setAssignedStudents(response.data.data);
        } else {
          setErrorMessage("Failed to fetch assigned students.");
        }
      } catch (error) {
        console.error("Error fetching assigned students:", error);
        setErrorMessage("Failed to fetch assigned students.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedStudents();
  }, [id]);

  return (
    <div className="container mx-auto mt-8">
      {loading ? (
        <p>Loading assigned students...</p>
      ) : (
        <>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {assignedStudents.length > 0 ? (
            <div>
              <h2 className="text-lg font-bold mb-4">Assigned Students:</h2>
              <ul>
                {assignedStudents.map((student) => (
                  <li key={student._id}>{student.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No assigned students found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default GetStudentsAssigntoTeacher;
