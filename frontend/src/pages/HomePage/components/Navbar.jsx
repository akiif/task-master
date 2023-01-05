import React from 'react';
import "../../../assets/css/navbar.css";

// import components
import Logo from '../../../components/Logo';
import LogoutButton from './LogoutButton';
import ToggleThemeButton from './ToggleThemeButton';

function Navbar() {
  return (
    <nav className='navbar'>
      <Logo />
      <div className="navbar-elements">
        <ToggleThemeButton />
        <LogoutButton />
      </div>
    </nav>
  );
}

export default Navbar;
