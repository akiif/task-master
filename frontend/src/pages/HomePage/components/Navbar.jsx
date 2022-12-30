import React from 'react';
import "../../../assets/css/navbar.css";

// import components
import Logo from '../../../components/Logo';
import LogoutButton from './LogoutButton';

function Navbar() {
  return (
    <nav className='navbar'>
      <Logo />
      <LogoutButton />
    </nav>
  );
}

export default Navbar;
