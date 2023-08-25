import React from "react";
import { Link } from "react-router-dom";
import classes from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={classes.list}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/librerians">Bibliotekari</Link>
      <Link to="/students">Ucenici</Link>
      <Link to="/books">knjige</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
};

export default Sidebar;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import classes from "./sidebar.module.css";

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const navigateToDashboard = () => {
//     navigate("/dashboard");
//   };

//   const navigateToBibliotekari = () => {
//     navigate("/bibliotekari");
//   };

//   const navigateToUcenici = () => {
//     navigate("/ucenik");
//   };

//   const navigateToBooks = () => {
//     navigate("/books");
//   };

//   return (
//     <div className={classes.list}>
//       <button onClick={navigateToDashboard}>Dashboard</button>
//       <button onClick={navigateToBibliotekari}>Bibliotekari</button>
//       <button onClick={navigateToUcenici}>Ucenici</button>
//       <button onClick={navigateToBooks}>Knjige</button>
//     </div>
//   );
// };

// export default Sidebar;
