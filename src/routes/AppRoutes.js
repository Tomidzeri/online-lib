import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "../services/PrivateRoute";
import LoginForm from "../pages/service-stranice/LoginForm";
import SignupForm from "../pages/service-stranice/SignupForm";
import Logout from "../services/Logout";
import LayoutApp from "../layout/Layout";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import Books from "../pages/book-stranice/Books";
import Librarians from "../pages/user-stranice/Librarians";
import Students from "../pages/user-stranice/Students";
import Settings from "../pages/Settings";
import UserAddForm from "../components/UI/actions/userActions/UserAddForm";
import EditUserForm from "../components/UI/actions/userActions/EditUserForm";
import ViewUserDetails from "../components/UI/actions/userActions/ViewUserDetails";
import ViewStudentDetails from "../components/UI/actions/userActions/studentPage/ViewStudentDetails.js";
import Statistics from "../layout/dashboard-content/Statistics";
import Activities from "../layout/dashboard-content/Activities";
import Reservations from "../layout/dashboard-content/Reservations";
import ArhiviraneRezervacijeTable from "../pages/book-stranice/tables/ArhiviraneRezervacijeTable";
import VraceneKnjigeTable from "../pages/book-stranice/tables/vraceneKnjigeTable";
import IzdateKnjigeTable from "../pages/book-stranice/tables/IzdateKnjigeTable";
import RezervacijeKnjigaTable from "../pages/book-stranice/tables/RezervisaneKnjigeTable";
import PrekoraceneKnjigeTable from "../pages/book-stranice/tables/PrekoraceneKnjigeTable";
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
import PolisaTab from "../components/UI/tabs/settings/Polisa";
import KategorijeTab from "../components/UI/tabs/settings/Kategorije";
import ZanroviTab from "../components/UI/tabs/settings/Zanrovi";
import IzdavacTab from "../components/UI/tabs/settings/Izdavac";
import PovezTab from "../components/UI/tabs/settings/Povez";
import FormatTab from "../components/UI/tabs/settings/Format";
import PismoTab from "../components/UI/tabs/settings/Pismo";
import ViewIzdateInfo from "../components/UI/actions/bookActions/viewTransactions/ViewIzdate";
import ViewPrekoraceneInfo from "../components/UI/actions/bookActions/viewTransactions/ViewPrekoracene";
import ViewVraceneInfo from "../components/UI/actions/bookActions/viewTransactions/ViewVracene";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRoutes = ({ handleSetToken, setToken, token }) => {
  const userRole = sessionStorage.getItem("libraryRole");
  const navigate = useNavigate();

  const redirectToBooks = useCallback(() => {
    if (userRole === "Učenik") {
      navigate("/books");
    }
  }, [userRole]);

  useEffect(() => {
    redirectToBooks();
  }, [redirectToBooks]);

  useEffect(() => {
    if (userRole === "Učenik") {
      toast.error("Nemate ovlašćenje za pristup ovoj stranici.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        closeOnClick: true,
      });
    }
  }, [userRole]);

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

      <Route path="/*" element={<LayoutApp token={token} />}>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="activities" element={<Activities />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="statistics" element={<Statistics />} />

        <Route path="profile" element={<Profile />} />
        <Route path="editprofile" element={<EditProfile />} />
        <Route path="books" element={<Books />} />

        <Route path="borrows" element={<Borrows />} />
        <Route path="izdate-knjige" element={<IzdateKnjigeTable />} />
        <Route path="vracene-knjige" element={<VraceneKnjigeTable />} />
        <Route path="prekoracene-knjige" element={<PrekoraceneKnjigeTable />} />
        <Route
          path="aktivne-rezervacije"
          element={<RezervacijeKnjigaTable />}
        />
        <Route
          path="arhivirane-rezervacije"
          element={<ArhiviraneRezervacijeTable />}
        />

        <Route path="librarians" element={<Librarians />} />
        <Route path="students" element={<Students />} />
        <Route path="authors" element={<Authors />} />
        <Route path="settings" element={<Settings />} />
        <Route path="polisa" element={<PolisaTab />} />
        <Route path="kategorije" element={<KategorijeTab />} />
        <Route path="zanrovi" element={<ZanroviTab />} />
        <Route path="izdavac" element={<IzdavacTab />} />
        <Route path="povez" element={<PovezTab />} />
        <Route path="format" element={<FormatTab />} />
        <Route path="pismo" element={<PismoTab />} />

        <Route path="viewuserdetails/:userId" element={<ViewUserDetails />} />
        <Route
          path="viewstudentdetails/:userId"
          element={<ViewStudentDetails />}
        />
        <Route path="edituserform/:userId" element={<EditUserForm />} />
        <Route path="useraddform" element={<UserAddForm />} />

        <Route path="createauthor" element={<CreateAuthor />} />
        <Route path="editauthor/:authorId" element={<EditAuthor />} />
        <Route path="viewauthor/:authorId" element={<ViewAuthorDetails />} />

        <Route path="storebook" element={<StoreBook />} />
        <Route path="viewbook/:bookId" element={<ViewBookDetails />} />
        <Route path="editbook/:bookId" element={<EditBook />} />
        <Route path="borrowbook/:bookId" element={<BorrowBook />} />
        <Route path="returnbook/:bookId" element={<ReturnBook />} />
        <Route path="writeoffbook/:bookId" element={<WriteOffBook />} />
        <Route path="reservebook/:bookId" element={<ReserveBook />} />

        <Route path="viewizdate/:id" element={<ViewIzdateInfo />} />
        <Route path="viewprekoracene/:id" element={<ViewPrekoraceneInfo />} />
        <Route path="viewvracene/:id" element={<ViewVraceneInfo />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
