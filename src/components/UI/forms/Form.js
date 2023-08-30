import React from "react";

const Form = ({ fields, formData, setFormData, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event); 
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]} 
            onChange={(event) =>
              setFormData((prevData) => ({
                ...prevData,
                [field.name]: event.target.value,
              }))
            } 
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
