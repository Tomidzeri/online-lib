import { useState, useEffect } from "react";
import libraryAPI from "../../utils/api";

const useFetchLibrarians = () => {
  const [librarians, setLibrarians] = useState([]);

  const fetchLibrarians = async () => {
    try {
       
      const response = await libraryAPI.get("/users");

      const librarianList = response.data.data;
      setLibrarians(librarianList);
      console.log(librarianList);
    } catch (error) {
      console.error("Error fetching librarians:", error);
    }
  };

  useEffect(() => {
    fetchLibrarians();
  }, []);

  return { librarians, setLibrarians }; 
};

export default useFetchLibrarians;
