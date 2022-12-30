import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

// import Material UI Components
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';

// import Icons
import PlusIcon from "../../../assets/images/plus-icon.svg";

// import api
import axiosRequest from "../../../api/user.api";

// import asyncThunk and redux actions
import { setTaskListUpdated } from '../../../state/features/tasks/tasksSlice';
import { logout } from "../../../state/features/auth/authSlice";

function AddTaskForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const initialState = {
    title: "",
    content: ""
  }
  const [note, setNote] = useState(initialState);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }

  const submitNote = (event) => {
    event.preventDefault();
    addTask();
    setNote(initialState);
    setIsExpanded(false);
    dispatch(setTaskListUpdated(true));
  }
  
  const addTask = () => {
    axiosRequest.post('/api/tasks', note)
      .then((res) => {
        console.log(res.data);
        toast.success("New task added successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to add a task, Please try again!");
        if (!err.response.data.isLoggedIn) {
          toast.error("You need to be logged in to add a task.");
          dispatch(logout());
          return navigate("/login");
        } else {
          toast.error("Unable to add a task, Please try again!");
        }
      });
  }

  return (
    <div className='add-task-container'>
      <ClickAwayListener onClickAway={() => setIsExpanded(false)}>
        <form className='add-task-form' onSubmit={submitNote}>
          <Zoom in={isExpanded}>
            <input 
              type={isExpanded ? "text" : "hidden"} 
              name="title"
              value={note.title} 
              placeholder='Title'
              onChange={handleChange} 
            />
          </Zoom>
          <Tooltip title="Add Task" arrow placement='left-start'>
            <textarea 
              name='content'
              placeholder='Take a note...'
              value={note.content} 
              rows={isExpanded ? 3 : 1}
              onClick={() => setIsExpanded(true)}
              onChange={handleChange} 
            />
          </Tooltip>
          <Zoom in={isExpanded}>
            <button type='submit' onClick={submitNote} >
              <img src={PlusIcon} alt="Add" className='add-btn' />
            </button>
          </Zoom>
        </form>
      </ClickAwayListener>
    </div>
  );
}

export default AddTaskForm;
