import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// import api
import axiosRequest from '../../../api/user.api';

// import icons
import LogoutIcon from "../../../assets/images/logout.svg";

// import asyncThunk and redux actions
import { clearTasks } from '../../../state/features/tasks/tasksSlice';
import { logout } from "../../../state/features/auth/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearTasks());
    dispatch(logout());
    submitLogout();
    toast.info("You have logged out!");
    navigate("/login");
  }

  const submitLogout = async () => {
    await axiosRequest.get('/logout')
      .then((res) => {
        console.log(res);
        dispatch(logout);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <button className='logout-btn' onClick={handleLogout}>
      <img src={LogoutIcon} alt="Logout-icon" className='logout-icon' />
      <p>Logout</p>
    </button>
  );
}

export default LogoutButton;
