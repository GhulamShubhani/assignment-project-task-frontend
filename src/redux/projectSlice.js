
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectsre: (state, action) => {
      state.projects = action.payload;
    },
    clearProjectsre: (state) => {
      state.projects = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProjectsre, clearProjectsre, setLoading, setError } = projectSlice.actions;
export default projectSlice.reducer;
