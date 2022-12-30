import React from 'react';
import "../../../assets/css/modal.css";

// import Material UI components
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';

// import Icons
import CloseIcon from "../../../assets/images/close-icon.svg";

// import Components
import EditTaskForm from './EditTaskForm';

function TaskModal(props) {
  return (
  <Grow in={props.modalIsOpen}>
    <div className='modal-container'>
      <ClickAwayListener onClickAway={() => props.setModalIsOpen(false)}>
        <div className="task-modal">
          <div className="modal-top-btn-container">
            <h2 className='modal-title'>Edit Task</h2>
            <Tooltip title="Close" arrow>
              <button className="close-btn" onClick={() => props.setModalIsOpen(false)}>
                <img src={CloseIcon} alt="close modal" />
              </button>
            </Tooltip>
          </div>
          <EditTaskForm 
            title={props.title}
            content={props.content}
            created_date={props.created_date}
            updated_date={props.updated_date}
            id={props.id}
          />
          </div>
        </ClickAwayListener>
    </div>
  </Grow>
  );
}

export default TaskModal;
