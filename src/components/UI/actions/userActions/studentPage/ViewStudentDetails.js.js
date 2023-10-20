import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserDetails from "../../../../../queries/korisnici/useUserDetails";
import ProfileDropdown from "../../ProfileActionsDropdown";
import updateUserData from "../../../../../queries/korisnici/useUpdateUserData";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCrossMark, GiCheckMark } from "react-icons/gi";
import BasicStudentInfo from "./BasicInfo";
import StudentBorrows from "./BorrowStats";

function ViewStudentDetails() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = useUserDetails(userId);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current");

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loginCount = sessionStorage.getItem("loginCount");
  const lastLoginTime = sessionStorage.getItem("loginTime");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const navigation = () => {
    if (user.role === "Bibliotekar") {
      navigate("/librarians");
    } else {
      navigate("/students");
    }
  };

  const roleDisplay = () => {
    if (user) {
      if (user.role === "Bibliotekar") {
        return <p>Bibliotekari</p>;
      } else if (user.role === "Učenik") {
        return <p>Ucenici</p>;
      }
    }
    return <p>Administratori</p>;
  };

  const validatePassword = () => {
    if (currentPassword !== user.password) {
      setPasswordError("Trenutna lozinka nije ispravna.");
    } else {
      setPasswordError("");
    }
  };

  const handleChangePassword = async () => {
    validatePassword();

    if (passwordError) {
      return;
    }

    try {
      const updatedData = await updateUserData(userId, {
        password: newPassword,
        password_confirmation: newPasswordConfirmation,
      });
      console.log("Password updated:", updatedData);
      toast.success("Lozinka uspješno izmijenjena.");
      closeModal();
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Greška prilikom izmjene lozinke.");
    }
  };

  return (
    <div className="mt-12">
      <div className="w-full">
        <div className="flex justify-between border-b border-gray-300 w-full">
          <div className="flex flex-col">
            <h2
              style={{ fontFamily: "'Rubik', sans-serif" }}
              className="text-5xl font-bold text-left ml-24 mt-2"
            >
              {user?.name} {user?.surname}
            </h2>
            <div className="flex items-center ml-24">
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={navigation}
              >
                {roleDisplay()}
              </button>
              <p className="text-blue-500">&nbsp;/ ID-{user?.id}</p>
            </div>
          </div>
          <div className="flex justify-between mr-8">
            <div className="flex items-center">
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={openModal}
              >
                Izmijeni lozinku
              </button>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => {
                  navigate(`/edituserform/${user.id}`);
                }}
              >
                &nbsp;&nbsp;&nbsp;Izmijeni podatke
              </button>
              <span className="mx-2 border-l border-gray-300 h-8" />
              <div className="flex flex-row justify-center items-center">
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className={`px-4 py-2 text-sm rounded-md ${
            activeTab === "current"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          } hover:bg-blue-500 hover:text-white`}
          onClick={() => switchTab("current")}
        >
          Osnovni detalji
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-md ${
            activeTab === "borrows"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          } hover:bg-blue-500 hover:text-white`}
          onClick={() => switchTab("borrows")}
        >
          Evidencija izdavanja
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content p-6 ml-16">
        {activeTab === "current" && (
          <BasicStudentInfo
            user={user}
            loading={loading}
            loginCount={loginCount}
            lastLoginTime={lastLoginTime}
          />
        )}
        {activeTab === "borrows" && <StudentBorrows userId={userId} />}
      </div>

      {/* Password Modal */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Change Password Modal"
        className="password-modal"
        overlayClassName="password-modal-overlay"
      >
        <div className="password-modal-content">
          <h2>Izmijeni lozinku</h2>
          {/* Current password input */}
          <input
            type="password"
            placeholder="Trenutna lozinka"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
          {/* New password input */}
          <input
            type="password"
            placeholder="Nova lozinka"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {/* New password confirmation input */}
          <input
            type="password"
            placeholder="Potvrdi lozinku"
            value={newPasswordConfirmation}
            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
          />
          <div className="password-modal-buttons">
            <button onClick={closeModal} className="cancel-button">
              <GiCrossMark color="#f44336" />{" "}
            </button>
            <button onClick={handleChangePassword} className="success-button">
              <GiCheckMark color="#007bff" />{" "}
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default ViewStudentDetails;
