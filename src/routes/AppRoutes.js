import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "../services/PrivateRoute";
import LoginForm from "../pages/service-stranice/LoginForm";
import SignupForm from "../pages/service-stranice/SignupForm";
import Logout from "../services/Logout";
import Layout from "../layout/Layout";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import Books from "../pages/book-stranice/Books";
import Librarians from "../pages/user-stranice/Librarians";
import Students from "../pages/user-stranice/Students";
import Settings from "../pages/Settings";
import UserAddForm from "../components/UI/actions/userActions/UserAddForm";
import EditUserForm from "../components/UI/actions/userActions/EditUserForm";
import ViewUserDetails from "../components/UI/actions/userActions/ViewUserDetails";
import Statistics from "../layout/dashboard-content/Statistics";
import Activities from "../layout/dashboard-content/Activities";
import Reservations from "../layout/dashboard-content/Reservations";
import StoreBook from "../pages/book-stranice/StoreBook";
import Authors from "../pages/Authors";
import EditAuthor from "../components/UI/actions/authorActions/EditAuthor";
import ViewAuthorDetails from "../components/UI/actions/authorActions/ViewAuthorDetails";
import CreateAuthor from "../components/UI/actions/authorActions/CreateAuthor";
import ViewBookDetails from "../components/UI/actions/bookActions/ViewBookDetails";
import EditBook from "../components/UI/actions/bookActions/EditBook";
import Borrows from "../pages/book-stranice/Borrows";
import EditProfile from "../components/UI/actions/profileActions/EditProfile";
import BorrowBook from "../components/UI/actions/bookActions/BorrowBook";
import ReturnBook from "../components/UI/actions/bookActions/ReturnBook";
import WriteOffBook from "../components/UI/actions/bookActions/WriteOffBook";
import ReserveBook from "../components/UI/actions/bookActions/ReserveBook";

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

      <Route path="/*" element={<Layout token={token} />}>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="activities" element={<Activities />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="statistics" element={<Statistics />} />

        <Route path="profile" element={<Profile />} />
        <Route path="books" element={<Books />} />
        <Route path="librarians" element={<Librarians />} />
        <Route path="students" element={<Students />} />
        <Route path="settings" element={<Settings />} />
        <Route path="authors" element={<Authors />} />
        <Route path="borrows" element={<Borrows />} />
        <Route path="useraddform" element={<UserAddForm />} />
        <Route path="createauthor" element={<CreateAuthor />} />
        <Route path="storebook" element={<StoreBook />} />

        <Route path="viewuserdetails/:userId" element={<ViewUserDetails />} />
        <Route path="edituserform/:userId" element={<EditUserForm />} />
        <Route path="editauthor/:authorId" element={<EditAuthor />} />
        <Route path="viewauthor/:authorId" element={<ViewAuthorDetails />} />
        <Route path="viewbook/:bookId" element={<ViewBookDetails />} />
        <Route path="editbook/:bookId" element={<EditBook />} />
        <Route path="editprofile/:bookId" element={<EditProfile />} />
        <Route path="borrowbook/:bookId" element={<BorrowBook />} />
        <Route path="returnbook/:bookId" element={<ReturnBook />} />
        <Route path="writeoffbook/:bookId" element={<WriteOffBook />} />
        <Route path="reservebook/:bookId" element={<ReserveBook />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
