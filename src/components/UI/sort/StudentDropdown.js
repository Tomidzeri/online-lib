import React, { useEffect, useState } from "react";
import useFetchStudents from "../../../queries/korisnici/useFetchStudents";

const StudentDropdown = ({ selectedStudent, handleStudentChange }) => {
  const { students } = useFetchStudents();
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    // Filter students with the role "Učenik"
    const ucenikStudents = students.filter((student) => student.role === "Učenik");
    setFilteredStudents(ucenikStudents);
  }, [students]);

  return (
    <div className="flex-1">
      <label htmlFor="studentDropdown" className="text-gray-600">
        Učenici:
      </label>
      <select
        id="studentDropdown"
        value={selectedStudent}
        onChange={handleStudentChange}
        className="w-full border rounded-md p-2"
      >
        <option value="">Svi</option>
        {filteredStudents.map((student) => (
          <option key={student.id} value={student.name}>
            {student.name} {student.surname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StudentDropdown;

