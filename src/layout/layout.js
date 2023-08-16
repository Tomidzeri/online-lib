import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import Navbar from '../layout/Navbar';

function Layout({ token, setToken }) { 
  const storedRoleId = localStorage.getItem("role_id");

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Header />
      <MainContent roleId={storedRoleId} />
      <Footer />
    </>
  );
}

export default Layout;