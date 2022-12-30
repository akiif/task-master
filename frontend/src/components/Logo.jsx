import React from 'react';
import { Link } from 'react-router-dom';

import TaskMasterIcon from "../assets/images/task-master-logo.svg";

function Logo() {
  return (
    <Link to="/" className='logo link-hover'>
      <img src={TaskMasterIcon} alt="" className='logo-img' />
      <p>Task-Master</p>
    </Link>
  );
}

export default Logo;
