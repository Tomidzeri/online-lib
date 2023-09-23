// import React, { useState } from "react";

// const Form = ({ fields, formData, setFormData, onSubmit }) => {
//   const [errors, setErrors] = useState({});
//   // Validation functions
//   const isNumber = (value) => /^\d*$/.test(value);
//   const isText = (value) => /^[a-zA-Z ]*$/.test(value);
//   const isEmail = (value) =>
//     /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
//   const isPasswordValid = (value) => value.length >= 8;
//   const isNameValid = (value) => /^[A-Z][a-zA-Z]*$/.test(value);
//   const isCustomNumberValid = (value) => /^[0-9]{13}$/.test(value);

//   const handleInputChange = (field, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   const validateField = (field, value) => {
//     let error = "";

//     switch (field.type) {
//       case "jmbg":
//         if (!isCustomNumberValid(value)) {
//           error = `Invalid input for ${field.name}`;
//         }
//         break;
//       case "number":
//         if (!isNumber(value)) {
//           error = "Invalid number input.";
//         }
//         break;
//       case "text":
//         if (!isText(value)) {
//           error = "Invalid text input.";
//         }
//         break;
//       case "email":
//         if (!isEmail(value)) {
//           error = "Invalid email input.";
//         }
//         break;
//       case "password":
//         if (!isPasswordValid(value)) {
//           error = "Password must be at least 8 characters.";
//         }
//         break;
//       case "name":
//         if (!isNameValid(value)) {
//           error = "Name must start with a capital letter.";
//         }
//         break;
//       default:
//         break;
//     }

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [field.name]: error,
//     }));
//   };

//   const handleFieldChange = (event, field) => {
//     const { value } = event.target;
//     validateField(field, value);
//     handleInputChange(field.name, value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Check for errors before submitting
//     const hasErrors = Object.values(errors).some((error) => error !== "");
//     if (!hasErrors) {
//       onSubmit(event);
//     } else {
//       console.error("Form has errors. Please correct them.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {fields.map((field) => (
//         <div key={field.name}>
//           <label htmlFor={field.name}>
//             {field.label} {field.required && <span>*</span>}
//           </label>
//           <input
//             type={field.type}
//             id={field.name}
//             name={field.name}
//             placeholder={field.placeholder}
//             value={formData[field.name]}
//             onChange={(event) => handleFieldChange(event, field)}
//           />
//           {errors[field.name] && (
//             <div className="error">{errors[field.name]}</div>
//           )}
//         </div>
//       ))}
//       <button type="submit">Check validation</button>
//     </form>
//   );
// };

// export default Form;

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Form = ({ fields, formData, setFormData, onSubmit }) => {
  const [errors, setErrors] = useState({});

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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", 
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ mt: 1, width: "100%" }} 
          onSubmit={handleSubmit}
        >
          {fields.map((field) => (
            <div key={field.name} style={{ width: "100%" }}>
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
              />
            </div>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Form;
