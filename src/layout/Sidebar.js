import React from "react";
import { Link } from "react-router-dom";
import { BsHouseDoor, BsPerson, BsBook, BsGear } from "react-icons/bs"; 
import classes from "./sidebar.module.css";

<<<<<<< HEAD
const Sidebar = ({ className }) => {
  return (
    <div className={`${classes.list} ${className}`}>
      <Link to="/dashboard">
        <BsHouseDoor className={classes.icon} />
        <p>Dashboard</p>
      </Link>
      <Link to="/librarians">
        <BsPerson className={classes.icon} />
        <p>Bibliotekari</p>
      </Link>
      <Link to="/students">
        <BsPerson className={classes.icon} />
        <p>Ucenici</p>
      </Link>
      <Link to="/books">
        <BsBook className={classes.icon} />
        <p>Knjige</p>
      </Link>
      <Link to="/settings">
        <BsGear className={classes.icon} />
        <p>Settings</p>
      </Link>
    </div>
  );
};

export default Sidebar;
=======
const Sidebar = () => {
    return ( <
        div className = { classes.list } >
        <
        Link to = "/dashboard" > Dashboard < /Link> <
        Link to = "/librarians" > Bibliotekari < /Link> <
        Link to = "/students" > Ucenici < /Link> <
        Link to = "/books" > Books < /Link> <
        Link to = "/settings" > Settings < /Link> <
        /div>
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
>>>>>>> 022d0703b8ff49cc20f4229c0b2d601a7592e3ec
