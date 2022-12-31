import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';

// import asyncThunk and redux actions
import { fetchTasks, setTaskListUpdated } from '../../../state/features/tasks/tasksSlice';

// import components
import LoadingScreen from '../../../components/LoadingScreen';
import TaskItem from './TaskItem';

function TasksList() {
  const { tasks, isLoading, taskListUpdated, userIsLoggedIn } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks())
    if (taskListUpdated === true) {
      dispatch(setTaskListUpdated(false));
    }
  }, [taskListUpdated]);

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!userIsLoggedIn) {
    return <Navigate to="/login" />
  }

  if (tasks.length === 0) {
    return <>
      <div className="no-tasks">
        <h2>No Tasks found</h2>
        <h4>Add a new Task to continue!</h4>
      </div>
      <TaskItem 
        key="1"
        index="1"
        title="No Tasks Found"
        content="Add a new task to continue!"
        created_date={Date()}
        updated_date={Date()}
        id={null}
      />
    </>
  }

  return (
    <div className='tasks-list'>
        {tasks && tasks.map((item, index) => (
          <TaskItem 
            key={index}
            index={index}
            title={item.title}
            content={item.content}
            created_date={item.created_date}
            updated_date={item.updated_date}
            id={item._id}
          />
        ))}
    </div>
  );
}

export default TasksList;