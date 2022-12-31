import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import api
import axiosRequest from "../../../api/user.api";

const initialState = {
  tasks: [],
  isLoading: true,
  taskListUpdated: false,
  userIsLoggedIn: false
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await
    axiosRequest.get('/api/tasks')
      .then((res) => res.data)
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
      state.isLoading = false;
    },
    setTaskListUpdated: (state, { payload }) => {
      state.taskListUpdated = payload;
    },
    setUserIsLoggedIn: (state, {payload}) => {
      state.userIsLoggedIn = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload ? action.payload : [];
        state.userIsLoggedIn = true;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
        state.tasks = [];
        state.userIsLoggedIn = false;
      });
  }
});

export const { clearTasks, setTaskListUpdated, setUserIsLoggedIn } = tasksSlice.actions;

export default tasksSlice.reducer;