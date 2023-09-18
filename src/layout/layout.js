import React from "react";
import "./styles/Layout.css";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

// const Layout = ({ children, userProfile }) => {
//   const currentPath = window.location.pathname;
//   const [route, setRoute] = useState("/");

//   return (
//     <div className="layout-container">
//       <Header className="header" />
//       <div className="main-content">
//         <Sidebar className="sidebar" />
//         <div className="content-area">
//           <Outlet route={route} /> {/* Pass route as a prop */}
//           <span className="content-line"></span>
//           {currentPath === "/librarians" && (
//             <Librarians userProfile={userProfile} />
//           )}
//           {currentPath === "/students" && (
//             <Students userProfile={userProfile} />
//           )}
//           {currentPath === "/books" && <Books />}
//           {currentPath === "/settings" && (
//             <Settings userProfile={userProfile} />
//           )}
//           {currentPath === "/dashboard" && (
//             <Dashboard userProfile={userProfile} />
//           )}
//           {currentPath === "/authors" && <Authors />}
//           {currentPath !== "/books" &&
//             currentPath !== "/students" &&
//             currentPath !== "/librarians" &&
//             currentPath !== "/settings" &&
//             currentPath !== "/authors" &&
//             currentPath !== "/dashboard" &&
//             children}
//           {![
//             "/librarians",
//             "/students",
//             "/books",
//             "/settings",
//             "/dashboard",
//             "/authors",
//           ].includes(currentPath) && children}
//         </div>
//       </div>
//       <Footer className="footer" />
//     </div>
//   );
// };

function Layout({ userProfile }) {
  return (
    <div>
      <Header className="header" />
      <div className="content-area">
        <Sidebar className="sidebar" />
        <main>
          <Outlet userProfile={userProfile} /> 
        </main>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Layout;
