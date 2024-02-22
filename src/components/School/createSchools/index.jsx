import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";

const CreateSchools = () => {
  const [name, setName] = useState("");
  const [school_name, setSchool] = useState("");
  const [mobile_no, setUserMobileNo] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role_id, setRoleId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateSchool = async (event) => {
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

      const response = await axios.post(
        baseUrl + "/api/school",
        {
          name,
          school_name,
          mobile_no,
          user_email: userEmail,
          password,
          role_id,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      setSuccessMessage(response.data.message);
      // Reset form fields
      setName("");
      setSchool("");
      setUserMobileNo("");
      setUserEmail("");
      setPassword("");

      setRoleId("");
    } catch (error) {
      console.error("Error creating school:", error);
      setErrorMessage("Failed to create school.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "school_name") {
      setSchool(value);
    } else if (name === "mobile_no") {
      setUserMobileNo(value);
    } else if (name === "userEmail") {
      setUserEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "role_id") {
      setRoleId(value);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleCreateSchool} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="schoolname" className="block mb-1">
            School Name:
          </label>
          <input
            type="text"
            id="school_name"
            name="school_name"
            value={school_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userMobileNo" className="block mb-1">
            User Mobile Number:
          </label>
          <input
            type="text"
            id="mobile_no"
            name="mobile_no"
            value={mobile_no}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userEmail" className="block mb-1">
            User Email:
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={userEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="roleId" className="block mb-1">
            Role ID:
          </label>
          <input
            type="text"
            id="role_id"
            name="role_id"
            value={role_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={loading}
          >
            Create School
          </button>
          {loading && <span className="text-gray-500">Creating school...</span>}
        </div>
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage.message}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage.message}</p>
        )}
      </form>
    </div>
  );
};
export default CreateSchools;
