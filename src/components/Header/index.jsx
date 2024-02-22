import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

const Header = () => {
  const { id } = useParams();
  const isLoggedIn = localStorage.getItem("token");
  const [dropdowns, setDropdowns] = useState({
    role: false,
    class: false,
    task: false,
    assignTask: false,
    school: false,
    comment: false,
    solution: false,
    award: false,
    assignAward: false,
    users: false,
  });

  console.log(id);

  const navigate = useNavigate();

  const toggleDropdownRole = () => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      role: !prevDropdowns.role,
    }));

    setDropdowns((prevDropdowns) => {
      const updatedDropdowns = { ...prevDropdowns };
      for (const key in updatedDropdowns) {
        if (key !== "role") {
          updatedDropdowns[key] = false;
        }
      }
      return updatedDropdowns;
    });
  };
  const toggleDropdownClass = () => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      class: !prevDropdowns.class,
    }));

    setDropdowns((prevDropdowns) => {
      const updatedDropdowns = { ...prevDropdowns };
      for (const key in updatedDropdowns) {
        if (key !== "class") {
          updatedDropdowns[key] = false;
        }
      }
      return updatedDropdowns;
    });
  };
  const toggleDropdownTask = () => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      task: !prevDropdowns.task,
    }));

    setDropdowns((prevDropdowns) => {
      const updatedDropdowns = { ...prevDropdowns };
      for (const key in updatedDropdowns) {
        if (key !== "task") {
          updatedDropdowns[key] = false;
        }
      }
      return updatedDropdowns;
    });
  };
  const toggleDropdownAssignTask = () => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      assignTask: !prevDropdowns.assignTask,
    }));

    setDropdowns((prevDropdowns) => {
      const updatedDropdowns = { ...prevDropdowns };
      for (const key in updatedDropdowns) {
        if (key !== "assignTask") {
          updatedDropdowns[key] = false;
        }
      }
      return updatedDropdowns;
    });
  };
  const toggleDropdownSchool = () => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      school: !prevDropdowns.school,
    }));

    setDropdowns((prevDropdowns) => {
      const updatedDropdowns = { ...prevDropdowns };
      for (const key in updatedDropdowns) {
        if (key !== "school") {
          updatedDropdowns[key] = false;
        }
      }
      return updatedDropdowns;
    });
  };
  const toggleDropdownComment = () => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      comment: !prevDropdowns.comment,
    }));

    setDropdowns((prevDropdowns) => {
      const updatedDropdowns = { ...prevDropdowns };
      for (const key in updatedDropdowns) {
        if (key !== "comment") {
          updatedDropdowns[key] = false;
        }
      }
      return updatedDropdowns;
    });
  };
  const toggleDropdownSolution = () => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      solution: !prevDropdowns.solution,
    }));

    setDropdowns((prevDropdowns) => {
      const updatedDropdowns = { ...prevDropdowns };
      for (const key in updatedDropdowns) {
        if (key !== "solution") {
          updatedDropdowns[key] = false;
        }
      }
      return updatedDropdowns;
    });
  };
  const toggleDropdownAward = () => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      award: !prevDropdowns.award,
    }));

    setDropdowns((prevDropdowns) => {
      const updatedDropdowns = { ...prevDropdowns };
      for (const key in updatedDropdowns) {
        if (key !== "award") {
          updatedDropdowns[key] = false;
        }
      }
      return updatedDropdowns;
    });
  };
  const toggleDropdownAssignAward = () => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      assignAward: !prevDropdowns.assignAward,
    }));

    setDropdowns((prevDropdowns) => {
      const updatedDropdowns = { ...prevDropdowns };
      for (const key in updatedDropdowns) {
        if (key !== "assignAward") {
          updatedDropdowns[key] = false;
        }
      }
      return updatedDropdowns;
    });
  };

  const toggleDropdownUsers = () => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      users: !prevDropdowns.users,
    }));

    setDropdowns((prevDropdowns) => {
      const updatedDropdowns = { ...prevDropdowns };
      for (const key in updatedDropdowns) {
        if (key !== "users") {
          updatedDropdowns[key] = false;
        }
      }
      return updatedDropdowns;
    });
  };

  return (
    <>
      {isLoggedIn && (
        <nav className="bg-blue-500 h-[10vh]">
          <div className="container mx-auto flex  justify-between px-4 py-2 h-full ">
            <ul className="flex items-center space-x-4 h-full ">
              <li>
                <Link to="/" className="text-white hover:text-gray-200">
                  <span> Home</span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    className="dropbtn text-white hover:text-gray-200"
                    onClick={toggleDropdownRole}
                  >
                    <span> Roles</span>
                  </button>
                  {dropdowns.role && (
                    <div className="dropdown-content flex flex-col bg-white absolute">
                      <Link to="/create-role" className="dropdown-item">
                        Create Role
                      </Link>

                      <Link to="/get-role" className="dropdown-item">
                        Get Role
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    className="dropbtn text-white hover:text-gray-200"
                    onClick={toggleDropdownClass}
                  >
                    <span> Classes</span>
                  </button>
                  {dropdowns.class && (
                    <div className="dropdown-content flex flex-col bg-white absolute">
                      <Link to="/create-class" className="dropdown-item">
                        Create Class
                      </Link>

                      <Link to="/get-class" className="dropdown-item">
                        Get Class
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    className="dropbtn text-white hover:text-gray-200"
                    onClick={toggleDropdownTask}
                  >
                    <span> Tasks</span>
                  </button>
                  {dropdowns.task && (
                    <div className="dropdown-content flex flex-col bg-white absolute">
                      <Link to="/create-task" className="dropdown-item">
                        Create Task
                      </Link>

                      <Link to="/get-tasks" className="dropdown-item">
                        Get Task
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    className="dropbtn text-white hover:text-gray-200"
                    onClick={toggleDropdownAssignTask}
                  >
                    <span> Assign Task</span>
                  </button>
                  {dropdowns.assignTask && (
                    <div className="dropdown-content flex flex-col bg-white absolute">
                      <Link to="/assign-task" className="dropdown-item">
                        Assign Task
                      </Link>

                      <Link to="/get-all-assign-task" className="dropdown-item">
                        Get Assigned Tasks
                      </Link>

                      <Link
                        to="/get-all-user-assign-task"
                        className="dropdown-item"
                      >
                        Get All User Assigned Tasks
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    className="dropbtn text-white hover:text-gray-200"
                    onClick={toggleDropdownSchool}
                  >
                    <span> Schools</span>
                  </button>
                  {dropdowns.school && (
                    <div className="dropdown-content flex flex-col bg-white absolute">
                      <Link to="/create-school" className="dropdown-item">
                        Create School
                      </Link>

                      <Link to="/get-schools" className="dropdown-item">
                        Get School
                      </Link>

                      <Link to="/get-all-teachers" className="dropdown-item">
                        Get Teachers
                      </Link>

                      <Link to="/get-all-students" className="dropdown-item">
                        Get Students
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    className="dropbtn text-white hover:text-gray-200"
                    onClick={toggleDropdownComment}
                  >
                    <span> Comments</span>
                  </button>
                  {dropdowns.comment && (
                    <div className="dropdown-content flex flex-col bg-white absolute">
                      <Link to="/create-comment" className="dropdown-item">
                        Create Comment
                      </Link>

                      <Link to="/get-all-comments" className="dropdown-item">
                        Get All Comments
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    className="dropbtn text-white hover:text-gray-200"
                    onClick={toggleDropdownSolution}
                  >
                    <span> Solutions</span>
                  </button>
                  {dropdowns.solution && (
                    <div className="dropdown-content flex flex-col bg-white absolute">
                      <Link to="/submit" className="dropdown-item">
                        Create Solution
                      </Link>

                      <Link to="/get-all-solutions" className="dropdown-item">
                        Get All Solutions
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    className="dropbtn text-white hover:text-gray-200"
                    onClick={toggleDropdownAward}
                  >
                    <span> Awards</span>
                  </button>
                  {dropdowns.award && (
                    <div className="dropdown-content flex flex-col bg-white absolute">
                      <Link to="/create-award" className="dropdown-item">
                        Create Award
                      </Link>
                      <Link to="/get-all-awards" className="dropdown-item">
                        Get All Awards
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    className="dropbtn text-white hover:text-gray-200"
                    onClick={toggleDropdownAssignAward}
                  >
                    <span> Assign Award</span>
                  </button>
                  {dropdowns.assignAward && (
                    <div className="dropdown-content flex flex-col bg-white absolute">
                      <Link to="/create-assign-award" className="dropdown-item">
                        Assign Award
                      </Link>

                      <Link to="/get-assign-award" className="dropdown-item">
                        Get All Assigned Awards
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    className="dropbtn text-white hover:text-gray-200"
                    onClick={toggleDropdownUsers}
                  >
                    <span>Users</span>
                  </button>
                  {dropdowns.users && (
                    <div className="dropdown-content flex flex-col bg-white absolute">
                      <Link to="/users-list" className="dropdown-item">
                        Get All Users
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <div className="flex items-center">
                  {!isLoggedIn ? (
                    <Link
                      to="/login"
                      className="text-white hover:text-gray-200"
                    >
                      Login
                    </Link>
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                    >
                      Log Out
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
