import { useState, useEffect } from "react";
import libraryAPI from "../utils/api";

const useFetchLibrarians = () => {
  const [librarians, setLibrarians] = useState([]);

  const fetchLibrarians = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await libraryAPI.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          role: "Bibliotekar",
        },
      });

      const librarianList = response.data.data;
      setLibrarians(librarianList);
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
