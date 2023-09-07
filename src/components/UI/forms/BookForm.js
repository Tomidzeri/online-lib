// BookForm.js
import React, { useState } from 'react';

const BookForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Author:
        <input type="text" name="author" value={formData.author} onChange={handleChange} />
      </label>
      <label>
        Genre:
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </label>
      <button type="submit">Create Book</button>
    </form>
  );
};

export default BookForm;
