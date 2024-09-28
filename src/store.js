// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import projectReducer from './redux/projectSlice';
import taskReducer from './redux/taskSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    task: taskReducer,
  },
});

export default store;
