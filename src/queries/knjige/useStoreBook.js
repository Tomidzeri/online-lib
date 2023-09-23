import { useState } from 'react';
import libraryAPI from '../../utils/api';

export const useStoreBook = () => {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);

  const storeBook = async (formData) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await libraryAPI.post('/books/store', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          deletePdfs: 0,
        }
      });

      const responseData = response.data;
      setSuccess(responseData.success);
      setMessage(responseData.message);

      if (responseData.data && responseData.data.id) {
        const newBookId = responseData.data.id;
        console.log('Newly created book ID:', newBookId);
      }

      setData(responseData.data);
    } catch (error) {
      console.error('Error storing book:', error);
      setSuccess(false);
      setMessage('Error storing book.');
    }
  };

  return { success, message, data, storeBook };
};
