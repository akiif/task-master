import React, { useState } from 'react';

// import Material UI components
import { Tooltip } from '@mui/material';

// import Components
import TaskModal from './TaskModal';

function TaskItem(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  return (
    <div className='task-item-container'>
      {modalIsOpen && 
        <TaskModal
          title={props.title}
          content={props.content}
          created_date={props.created_date}
          updated_date={props.updated_date}
          id={props.id}
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
        />
      }
      <Tooltip title="View Task" placement="top" arrow>
        <div className='task-item' onClick={openModal}>
          <h4 className='task-item-title'>{props.title}</h4>
          <p className='task-item-content'>{props.content}</p>
        </div>
      </Tooltip>
    </div>
  );
}

export default TaskItem;