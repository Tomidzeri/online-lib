import { useEffect, useState } from 'react';
import libraryAPI from '../../utils/api';

export const useCreateBook = () => {
  const [data, setData] = useState({
    categories: [],
    genres: [],
    authors: [],
    publishers: [],
    scripts: [],
    languages: [],
    bookbinds: [],
    formats: [],
  });

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await libraryAPI.get('/books/create', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = response.data.data;
        setData(responseData);
      } catch (error) {
        console.error('Error fetching book creation data:', error);
      }
    };

    fetchData();
  }, []);

  return data;
};
