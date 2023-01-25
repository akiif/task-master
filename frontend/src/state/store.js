import { configureStore } from "@reduxjs/toolkit";

// import redux reducers
import authReducer from "./features/auth/authSlice";
import tasksReducer from "./features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});