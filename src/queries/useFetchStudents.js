import { useState, useEffect } from "react";
import libraryAPI from "../utils/api";

const useFetchStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await libraryAPI.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          role: "Učenik",
        },
      });

      const studentList = response.data.data;
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, setStudents }; // Return both state and setter
};

export default useFetchStudents;
