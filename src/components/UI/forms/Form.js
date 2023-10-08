import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const Form = ({ fields, formData, setFormData, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateField = (field, value) => {
    let error = "";

    switch (field.type) {
      case "jmbg":
        // Add your custom validation logic for "jmbg" here
        break;
      case "number":
        // Add your custom validation logic for "number" here
        break;
      case "text":
        // Add your custom validation logic for "text" here
        break;
      case "email":
        // Add your custom validation logic for "email" here
        break;
      case "password":
        // Add your custom validation logic for "password" here
        break;
      case "name":
        // Add your custom validation logic for "name" here
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field.name]: error,
    }));
  };

  const handleFieldChange = (event, field) => {
    const { value } = event.target;
    validateField(field, value);
    handleInputChange(field.name, value);
  };

  const handleBioChange = (value) => {
    validateField("biography", value);
    handleInputChange("biography", value);
  };

  const handleInputFocus = (field) => {
    if (focusedInput !== field) {
      if (focusedInput) {
        document.getElementById(focusedInput).blur();
      }
      setFocusedInput(field);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      onSubmit(event);
    } else {
      console.error("Form has errors. Please correct them.");
    }
  };

  return (
    <Container component="main" maxWidth={false}> 
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          marginLeft: 5,
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ mt: 1, width: "40%" }}
          onSubmit={handleSubmit}
        >
          {fields.map((field) => (
            <div key={field.name} style={{ width: "100%" }}>
              {field.name === "biography" ? (
                <ReactQuill
                  value={formData[field.name]}
                  onChange={handleBioChange}
                  onFocus={() => handleInputFocus(field.name)}
                />
              ) : (
                <TextField
                  margin="normal"
                  required={field.required}
                  fullWidth
                  id={field.name}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={(event) => handleFieldChange(event, field)}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  onFocus={() => handleInputFocus(field.name)}
                />
              )}
            </div>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Form;
