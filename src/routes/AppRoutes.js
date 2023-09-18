import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "../services/PrivateRoute";
import LoginForm from "../pages/service-pages/LoginForm";
import SignupForm from "../pages/service-pages/SignupForm";
import Logout from "../services/Logout";
import Layout from "../layout/Layout";
import Dashboard from "../layout/Dashboard";
import Profile from "../layout/Profile";
import Books from "../pages/book-pages/Books";
import Librarians from "../pages/user-pages/Librarians";
import Students from "../pages/user-pages/Students";
import Settings from "../pages/Settings";
import UserAddForm from "../components/UI/userActions/UserAddForm";
import EditUserForm from "../components/UI/userActions/EditUserForm";
import ViewUserDetails from "../components/UI/userActions/ViewUserDetails";
import Statistics from "../layout/dashboard-content/Statistics";
import Activities from "../layout/dashboard-content/Activities";
import Reservations from "../layout/dashboard-content/Reservations";
import StoreBook from "../pages/book-pages/StoreBook";
import Authors from "../pages/Authors";
import EditAuthor from "../components/UI/authorActions/EditAuthor";
import ViewAuthorDetails from "../components/UI/authorActions/ViewAuthorDetails";
import CreateAuthor from "../components/UI/authorActions/CreateAuthor";
import ViewBookDetails from "../components/UI/bookActions/ViewBookDetails";
import EditBook from "../components/UI/bookActions/EditBook";

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

      <Route path="*" element={<Layout token={token} />}>
        <Route index element={<Dashboard />} />
        <Route path="activities" element={<Activities />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="statistics" element={<Statistics />} />

        <Route path="profile" element={<Profile />} />
        <Route path="books" element={<Books />} />
        <Route path="librarians" element={<Librarians />} />
        <Route path="students" element={<Students />} />
        <Route path="settings" element={<Settings />} />
        <Route path="authors" element={<Authors />} />
        <Route path="useraddform" element={<UserAddForm />} />
        <Route path="createauthor" element={<CreateAuthor />} />
        <Route path="store-book" element={<StoreBook />} />

        <Route path="viewuserdetails/:userId" element={<ViewUserDetails />} />
        <Route path="edituserform/:userId" element={<EditUserForm />} />
        <Route path="editauthor/:authorId" element={<EditAuthor />} />
        <Route path="viewauthor/:authorId" element={<ViewAuthorDetails />} />
        <Route path="viewbook/:bookId" element={<ViewBookDetails />} />
        <Route path="editbook/:bookId" element={<EditBook />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
