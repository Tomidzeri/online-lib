import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";

function Layout({ token, setToken, userRole }) {
  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Header />
      <MainContent userRole={userRole} />
      <Footer />
    </>
  );
}

export default Layout;
