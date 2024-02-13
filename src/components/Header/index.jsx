import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
    user: false,
  });

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
    <nav className="bg-blue-500 h-[10vh]">
      <div className="container mx-auto px-4 py-2 h-full ">
        <ul className="flex space-x-4 absolute h-[10vh] ">
          <li>
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown">
            <div className="dropdown">
              <button
                className="dropbtn text-white hover:text-gray-200"
                onClick={toggleDropdownRole}
              >
                Roles
              </button>
              {dropdowns.role && (
                <div className="dropdown-content flex flex-col bg-white">
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
                Classes
              </button>
              {dropdowns.class && (
                <div className="dropdown-content flex flex-col bg-white">
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
                Tasks
              </button>
              {dropdowns.task && (
                <div className="dropdown-content flex flex-col bg-white">
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
                Assign Task
              </button>
              {dropdowns.assignTask && (
                <div className="dropdown-content flex flex-col bg-white">
                  <Link to="/assign-task" className="dropdown-item">
                    Assign Task
                  </Link>

                  <Link to="/get-all-assign-task" className="dropdown-item">
                    Get Assigned Tasks
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
                Schools
              </button>
              {dropdowns.school && (
                <div className="dropdown-content flex flex-col bg-white">
                  <Link to="/create-school" className="dropdown-item">
                    Create School
                  </Link>
                  <Link to="/get-schools" className="dropdown-item">
                    Get School
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
                Comments
              </button>
              {dropdowns.comment && (
                <div className="dropdown-content flex flex-col bg-white">
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
                Solutions
              </button>
              {dropdowns.solution && (
                <div className="dropdown-content flex flex-col bg-white">
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
                Awards
              </button>
              {dropdowns.award && (
                <div className="dropdown-content flex flex-col bg-white">
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
                Assign Award
              </button>
              {dropdowns.assignAward && (
                <div className="dropdown-content flex flex-col bg-white">
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
                Users
              </button>
              {dropdowns.users && (
                <div className="dropdown-content flex flex-col bg-white">
                  <Link to="/users-list" className="dropdown-item">
                    Get All Users
                  </Link>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
      <div className="flex justify-end text-center">
        <Link to="/login" className="text-white hover:text-gray-200">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Header;
