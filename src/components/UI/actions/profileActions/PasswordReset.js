import React, { useState } from "react";
import { resetPassword } from "../../../../queries/profileInfo/resetPassword";
const PasswordReset = ({ token, loggedInUsername }) => {
  const [passwordData, setPasswordData] = useState({
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(token, loggedInUsername, passwordData);
      // Handle success, maybe show a success message
    } catch (error) {
      console.error("Error resetting password:", error);
      // Handle error, maybe show an error message
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Password Reset</h2>
      <div className="pb-8">
        <label htmlFor="password" className="text-left font-black">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={passwordData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="pb-8">
        <label htmlFor="password_confirmation" className="text-left font-black">
          Confirm Password
        </label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          value={passwordData.password_confirmation}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default PasswordReset;
