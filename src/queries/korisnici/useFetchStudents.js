import { useState, useEffect } from "react";
import libraryAPI from "../../utils/api";

const useFetchStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
       
      const response = await libraryAPI.get("/users");

      const studentList = response.data.data;
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, setStudents }; 
};

export default useFetchStudents;
