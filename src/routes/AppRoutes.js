import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "../services/PrivateRoute";
import LoginForm from "../pages/LoginForm";
import SignupForm from "../pages/SignupForm";
import Logout from "../services/Logout";
import Layout from "../layout/Layout";
import Dashboard from "../layout/Dashboard";
import Profile from "../layout/Profile";
import Books from "../pages/Books";
import Librarians from "../pages/Librarians";
import Students from "../pages/Students";
import Settings from "../pages/Settings";
import UserAddForm from "../components/UI/forms/UserAddForm";
import EditUserForm from "../components/UI/forms/EditUserForm";
import ViewUserDetails from "../components/UI/tables/ViewUserDetails";

const AppRoutes = ({ handleSetToken, setToken, token }) => {
  return (
      <Routes>
        <Route
          path="/login"
          element={
            <PrivateRoute
              element={<LoginForm setToken={handleSetToken} />}
              authenticated={!!token}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <PrivateRoute
              element={<SignupForm setToken={handleSetToken} />}
              authenticated={!!token}
            />
          }
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute
              element={<Logout token={token} setToken={setToken} />}
              authenticated={!!token}
            />
          }
        />
        <Route
          path="*"
          element={
            <Layout token={token}>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/books" element={<Books />} />
                <Route path="/librarians" element={<Librarians />} />
                <Route path="/students" element={<Students />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/useraddform" element={<UserAddForm />} />
                <Route
                  path="/viewuserdetails/:userId"
                  element={<ViewUserDetails />}
                />
                <Route
                  path="/edituserform/:userId"
                  element={<EditUserForm />}
                />
              </Routes>
            </Layout>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
  );
};

export default AppRoutes;
