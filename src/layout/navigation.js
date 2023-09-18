import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const navigateToAddUser = (role) => {
    navigate(`/useraddform?role=${role}`);
  };

  return {
    navigateToDashboard,
    navigateToProfile,
    navigateToAddUser,
  };
};
