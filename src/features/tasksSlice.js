import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: savedTasks,
  },
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.list.push(action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.list));
      },
      prepare: (title, priority, category) => {
        return {
          payload: {
            id: nanoid(),
            title,
            priority,
            category,
          },
        };
      },
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.list));
    },
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
