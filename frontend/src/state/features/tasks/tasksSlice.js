import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import api
import axiosRequest from "../../../api/user.api";

const initialState = {
  tasks: [],
  isLoading: true,
  taskListUpdated: false
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await
    axiosRequest.get('/api/tasks')
      .then((res) => res.data)
      .catch(err => console.log(err))
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
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
        state.tasks = [];
      });
  }
});

export const { clearTasks, setTaskListUpdated } = tasksSlice.actions;

export default tasksSlice.reducer;