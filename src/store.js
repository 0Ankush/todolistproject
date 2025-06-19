
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import tasksReducer from "./features/tasksSlice";
import weatherReducer from "./features/weatherSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    weather: weatherReducer,
  },

});

export default store;

