import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

// import api
import axiosRequest from '../../../api/user.api';

// import asyncThunk and redux actions
import { setTaskListUpdated } from '../../../state/features/tasks/tasksSlice';
import { logout } from "../../../state/features/auth/authSlice";

// import Material UI Components
import Tooltip from '@mui/material/Tooltip';

// import Icons
import DeleteIcon from "../../../assets/images/delete-icon.svg";
import EditIcon from "../../../assets/images/edit-icon.svg";

function EditTaskForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editNote, setEditNote] = useState({
    title: props.title,
    content: props.content
  });

  const processDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('default', {
      month: 'long',
    });
    return `${month} ${day} ${year}`
  }

  const moveCaretAtEnd = (e) => {
    var temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setEditNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }
  const handleEditSubmit = (event) => {
    event.preventDefault();
    editTask();
    dispatch(setTaskListUpdated(true));
  }

  const editTask = () => {
    axiosRequest.put('/api/tasks', {
      taskId: props.id,
      ...editNote
    })
      .then((res) => {
        console.log(res.data);
        toast.success("Task edited successfully!");
      })
      .catch((err) => {
        console.log(err);
        if (!err.response.data.isLoggedIn) {
          toast.error("You need to be logged in to edit the task.");
          dispatch(logout());
          return navigate("/login");
        } else {
          toast.error("Unable to edit the task. Please try again.");
        }
      });
  }

  const deleteNote = () => {
    deleteTaskRequest();
    dispatch(setTaskListUpdated(true));
  }

  const deleteTaskRequest = () => {
    axiosRequest.delete('/api/tasks', {
      data: {
        taskId: props.id
      }
    })
      .then((res) => {
        console.log(res.data);
        toast.success("Task deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
        if (!err.response.data.isLoggedIn) {
          toast.error("You need to be logged in to edit the task.");
          dispatch(logout());
          return navigate("/login");
        } else {
          toast.error("Unable to delete the task, Please try again.");
        }
      });
  }

  return (
    <form className='edit-task-form' onSubmit={handleEditSubmit}>
      <input 
        type="text" 
        name="title" 
        value={editNote.title}
        onChange={handleOnChange}
        className="edit-task-form-title"
        placeholder='title'
      />
      <textarea 
        name="content" 
        value={editNote.content}
        onChange={handleOnChange}
        className="edit-task-form-content"
        autoFocus
        onFocus={moveCaretAtEnd}
        placeholder="Create a note.."
      />
      <div className="date-container">
        <p className='task-date created-date'>{ `Created ${processDate(props.created_date)}`}</p>
        <p className='task-date updated-date'>{ `Edited ${processDate(props.updated_date)}`}</p>
      </div>
      <div className="modal-bottom-btn-container">
        <Tooltip title="Delete" arrow>
          <button className="edit-task-form-btn delete-btn" onClick={deleteNote}>
            <img src={DeleteIcon} alt="delete" className='edit-task-form-img' />
          </button>
        </Tooltip>
        <Tooltip title="Edit" arrow>
          <button type="submit" className='edit-task-form-btn edit-btn' onClick={handleEditSubmit}>
            <img src={EditIcon} alt="edit" className='edit-task-form-img' />
          </button>
        </Tooltip>
      </div>
    </form>
  );
}

export default EditTaskForm;
