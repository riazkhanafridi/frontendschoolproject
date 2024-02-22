// RegistrationForm.js

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [classId, setClassId] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      await axios.post(baseUrl + "/api/signup", {
        name,
        email,
        password,
        school_id: schoolId,
        role_id: roleId,
        class_id: classId,
      });

      setRegistrationStatus("Registration successful!");

      // You can redirect the user to another page or perform additional actions here
    } catch (error) {
      console.error("Registration error:", error);

      setRegistrationStatus("An error occurred during registration.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Registration Form</h2>

      {registrationStatus && (
        <div className="mb-4 text-green-600">{registrationStatus}</div>
      )}

      <form onSubmit={handleRegistration}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role_Id
          </label>
          <input
            type="text"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            School_Id
          </label>
          <input
            type="text"
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Class_Id
          </label>
          <input
            type="text"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Add other form fields as needed */}

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
      <div>
        <p>
          Already have an account{" "}
          <Link to={"/login"}>
            <span className="text-blue-500">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
