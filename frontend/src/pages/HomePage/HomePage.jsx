// import modules
import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../assets/css/home.css";

// import components
import Navbar from "./components/Navbar";
import AddTaskForm from './components/AddTaskForm';
import TasksList from './components/TasksList';

function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {return <Navigate to="/login" />}

  return (
    <div className='home-page'>
      <Navbar />
      <AddTaskForm />
      <TasksList />
    </div>
  );
}

export default Home;
