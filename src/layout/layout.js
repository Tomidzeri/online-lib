import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import Navbar from '../layout/Navbar';

function Layout({ token, setToken }) { 
  return (
    <>
      <Navbar token={token} setToken={setToken} /> 
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}

export default Layout;
