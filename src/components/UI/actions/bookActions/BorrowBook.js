import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../buttons/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { borrowBook } from '../../../../queries/knjige/useSingleBookBorrow';
import useFetchStudents from '../../../../queries/korisnici/useFetchStudents';

const BorrowBook = ({ bookId, onBorrowSuccess }) => {
  const [borrowDate, setBorrowDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const navigate = useNavigate();

  const { students } = useFetchStudents();
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleBorrow = async () => {
    try {
      const borrowedBookData = {
        userId: selectedUserId,
        datumIzdavanja: borrowDate.toISOString(), // Updated field name
        datumVracanja: returnDate.toISOString(), // Updated field name
      };

      await borrowBook(bookId, borrowedBookData);

      // Pass the borrowed book data to the parent component (Books.js)
      if (onBorrowSuccess) {
        onBorrowSuccess({
          bookId: bookId,
          borrowDate: borrowedBookData.datumIzdavanja, // Updated field name
          returnDate: borrowedBookData.datumVracanja,
        });
      }

      navigate('/books');
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const filteredStudents = students.filter((student) => student.role === 'Učenik');


  return (
    <div className="main-content mt-24 ml-20">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-center">Izdaj Knjigu</h2>
        </div>
        <div className="flex justify-center">
          <form className="w-1/2">
            <div className="mb-4">
              <label
                htmlFor="userId"
                className="block text-gray-600 font-semibold mb-2"
              >
                Izaberi ucenika koji zaduzuje knjigu
              </label>
              <select
                id="userId"
                name="userId"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                {filteredStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {`${student.name} ${student.surname}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="borrowDate"
                className="block text-gray-600 font-semibold mb-2"
              >
                Datum izdavanja
              </label>
              <DatePicker
                id="borrowDate"
                selected={borrowDate}
                onChange={(date) => setBorrowDate(date)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="returnDate"
                className="block text-gray-600 font-semibold mb-2"
              >
                Datum vracanja (Datum isteka 20 dana)
              </label>
              <DatePicker
                id="returnDate"
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
            <Button
              onClick={handleBorrow}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Izdaj Knjigu
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;
