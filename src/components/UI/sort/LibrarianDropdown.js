import React, { useEffect, useState } from "react";
import useFetchLibrarians from "../../../queries/korisnici/useFetchLibrarians";

const LibrariansDropdown = ({ selectedLibrarian, handleLibrarianChange }) => {
  const { librarians } = useFetchLibrarians();
  const [filteredLibrarians, setFilteredLibrarians] = useState([]);

  useEffect(() => {
    const bibliotekarLibrarians = librarians.filter((librarian) => librarian.role === "Bibliotekar");
    setFilteredLibrarians(bibliotekarLibrarians);
  }, [librarians]);

  return (
    <div className="flex-1">
      <label htmlFor="librarianDropdown" className="text-gray-600">
        Bibliotekari:
      </label>
      <select
        id="librarianDropdown"
        value={selectedLibrarian}
        onChange={handleLibrarianChange}
        className="w-full border rounded-md p-2"
      >
        <option value="">Svi</option>
        {filteredLibrarians.map((librarian) => (
          <option key={librarian.id} value={librarian.name}>
            {librarian.name} {librarian.surname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LibrariansDropdown;
