// navigation.js
import { useNavigate } from "react-router-dom";

export const useNavigateToDashboard = () => {
  const navigate = useNavigate();
  return () => navigate("/dashboard");
};

export const useNavigateToLibrarians = () => {
  const navigate = useNavigate();
  return () => navigate("/librarians");
};

export const useNavigateToStudents = () => {
  const navigate = useNavigate();
  return () => navigate("/students");
};

export const useNavigateToBooks = () => {
  const navigate = useNavigate();
  return () => navigate("/books");
};

export const useNavigateToAuthors = () => {
  const navigate = useNavigate();
  return () => navigate("/authors");
};

export const useNavigateToSettings = () => {
  const navigate = useNavigate();
  return () => navigate("/settings");
};
