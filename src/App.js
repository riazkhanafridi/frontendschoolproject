import ForgotPassword from "./components/User/Forgotpassword";
import Home from "./components/Home";
import Login from "./components/User/Login/Index";
import SignUp from "./components/User/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/User/resetPassword";
import UserList from "./components/User/UserList";
import UserDetail from "./components/User/UserDetail";
import UpdateUser from "./components/User/UpdateUser";
import AssignStudentstoTeacher from "./components/User/AssignStudentstoTeacher";
import GetStudentsAssigntoTeacher from "./components/User/GetStudentsAssigntoTeacher.jsx";
import CreateSchools from "./components/School/createSchools/index.jsx";
import GetAllSchools from "./components/School/GetAllSchools/index.jsx";
import GetAllSchoolsTeachers from "./components/School/GetAllSchoolsTeachers.jsx/index.jsx";
import GetAllSchoolsStudents from "./components/School/GetAllSchoolsStudents.jsx/index.jsx";
import UpdateSchool from "./components/School/UpdateSchool/index.jsx";
import CreateClass from "./components/Class/CreateClass/index.jsx";
import GetAllClasses from "./components/Class/GetAllClasses/index.jsx";
import UpdateClass from "./components/Class/UpdateClass/index.jsx";
import CreateRole from "./components/Role/CreateRole/index.jsx";
import GetRole from "./components/Role/GetRole/index.jsx";
import UpdateRole from "./components/Role/UpdateRole/index.jsx";
import TaskCreate from "./components/Task/TaskCreate/index.jsx";
import GetAllTasks from "./components/Task/GetAllTask/index.jsx";
import GetSingleTask from "./components/Task/GetSingleTask/index.jsx";
import UpdateTask from "./components/Task/UpdtateTask/index.jsx";

import AssignTask from "./components/TaskAssign/AssignTask/index.jsx";
import GetAllAssignTasks from "./components/TaskAssign/GetAllAssignTask/index.jsx";
import GetAllUserAssignedTasks from "./components/TaskAssign/GetAllUserAssignTask/index.jsx";
import GetSingleAssignTask from "./components/TaskAssign/GetSingleAssignTask/index.jsx";
import GetAllSchoolAssignedTask from "./components/TaskAssign/GetAllSchoolAssignTask/index.jsx";
import UpdateAssignTask from "./components/TaskAssign/UpdateAssignTask/index.jsx";
import SubmitTaskSolution from "./components/TaskSol/SubmitTaskSolution/index.jsx";
import TaskSolutionsList from "./components/TaskSol/TaskSolutionsList/index.jsx";
import SingleTaskSolution from "./components/TaskSol/SingleTaskSolution/index.jsx";
import UserTaskSolutions from "./components/TaskSol/UserTaskSolutions/index.jsx";

import UpdateTaskSolution from "./components/TaskSol/UpdateTaskSolution/index.jsx";
import CreateAward from "./components/Award/CreateAward/index.jsx";
import GetSingleAward from "./components/Award/GetSingleAward/index.jsx";
import GetAllAwards from "./components/Award/GetAllAwards/index.jsx";
import UpdateAward from "./components/Award/UpdateAward/index.jsx";

import CreateAssignAward from "./components/AssignAward/CreateAssignAward/index.jsx";
import GetAllAssignAwards from "./components/AssignAward/GetAllAssignAward/index.jsx";
import GetSingleAssignAward from "./components/AssignAward/GetSingleAssignAward/index.jsx";
import GetAllUserAssignedAward from "./components/AssignAward/GetAllUserAssignAward/index.jsx";
import CreateComment from "./components/Comments/CreateComment/index.jsx";
import GetSingleComment from "./components/Comments/GetSingleComment/index.jsx";
import GetAllComments from "./components/Comments/GetAllComments/index.jsx";
import UpdateComment from "./components/Comments/UpdateComment/index.jsx";

import Header from "./components/Header/index.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GetApproveTask from "./components/TaskSol/getApproveTask/index.jsx";

import GetRejectTask from "./components/TaskSol/getRejectTask/index.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/users-list"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route path="/user-detail/:id" element={<UserDetail />} />
          <Route path="/user-update/:id" element={<UpdateUser />} />

          <Route
            path="/stu-assignt-to-teacher/:id"
            element={<AssignStudentstoTeacher />}
          />
          <Route
            path="/get-stu-assignt-to-teacher/:id"
            element={<GetStudentsAssigntoTeacher />}
          />
          <Route
            path="/create-school"
            element={
              <ProtectedRoute>
                <CreateSchools />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-schools"
            element={
              <ProtectedRoute>
                <GetAllSchools />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-all-teachers"
            element={
              <ProtectedRoute>
                <GetAllSchoolsTeachers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-all-students"
            element={
              <ProtectedRoute>
                <GetAllSchoolsStudents />
              </ProtectedRoute>
            }
          />
          <Route path="/update-school/:id" element={<UpdateSchool />} />

          <Route
            path="/create-class"
            element={
              <ProtectedRoute>
                <CreateClass />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-class"
            element={
              <ProtectedRoute>
                <GetAllClasses />
              </ProtectedRoute>
            }
          />
          <Route path="/update-class/:id" element={<UpdateClass />} />

          <Route
            path="/create-role"
            element={
              <ProtectedRoute>
                <CreateRole />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-role"
            element={
              <ProtectedRoute>
                <GetRole />
              </ProtectedRoute>
            }
          />
          <Route path="/update-role/:id" element={<UpdateRole />} />

          <Route
            path="/create-task"
            element={
              <ProtectedRoute>
                <TaskCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-tasks"
            element={
              <ProtectedRoute>
                <GetAllTasks />
              </ProtectedRoute>
            }
          />
          <Route path="/get-single-task/:id" element={<GetSingleTask />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />

          <Route path="/assign-task/" element={<AssignTask />} />
          <Route
            path="/get-all-assign-task/"
            element={
              <ProtectedRoute>
                <GetAllAssignTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-all-user-assign-task/"
            element={
              <ProtectedRoute>
                <GetAllUserAssignedTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-single-assign-task/:id"
            element={<GetSingleAssignTask />}
          />
          <Route
            path="/get-all-school-assign-task/:id"
            element={<GetAllSchoolAssignedTask />}
          />
          <Route
            path="/update-assign-task/:id"
            element={<UpdateAssignTask />}
          />

          <Route
            path="/submit"
            element={
              <ProtectedRoute>
                <SubmitTaskSolution />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-all-solutions"
            element={
              <ProtectedRoute>
                <TaskSolutionsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-user-approved-task/:id"
            element={<GetApproveTask />}
          />

          <Route path="/get-user-reject-task/:id" element={<GetRejectTask />} />

          <Route
            path="/get-single-task-solutions/:id"
            element={<SingleTaskSolution />}
          />
          <Route
            path="/get-user-task-solutions/:id"
            element={<UserTaskSolutions />}
          />
          <Route path="/update-sol-task/:id" element={<UpdateTaskSolution />} />

          <Route
            path="/create-award"
            element={
              <ProtectedRoute>
                <CreateAward />
              </ProtectedRoute>
            }
          />
          <Route path="/get-award/:id" element={<GetSingleAward />} />
          <Route
            path="/get-all-awards"
            element={
              <ProtectedRoute>
                <GetAllAwards />
              </ProtectedRoute>
            }
          />
          <Route path="/update-award/:id" element={<UpdateAward />} />

          <Route path="/create-assign-award" element={<CreateAssignAward />} />
          <Route path="/get-assign-award" element={<GetAllAssignAwards />} />
          <Route
            path="/get-single-assign-award/:id"
            element={<GetSingleAssignAward />}
          />
          <Route
            path="/get-user-assign-award"
            element={<GetAllUserAssignedAward />}
          />
          <Route
            path="/create-comment"
            element={
              <ProtectedRoute>
                <CreateComment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-single-comment/:id"
            element={<GetSingleComment />}
          />
          <Route
            path="/get-all-comments"
            element={
              <ProtectedRoute>
                <GetAllComments />
              </ProtectedRoute>
            }
          />
          <Route path="/update-comment/:id" element={<UpdateComment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
