import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../features/tasksSlice";
import { fetchWeather } from "../features/weatherSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const PriorityColor = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const weather = useSelector((state) => state.weather);

  useEffect(() => {
    if (!weather.data && !weather.loading) {
     
      dispatch(fetchWeather({ latitude: 28.6139, longitude: 77.2090 }));
    }
  }, [dispatch, weather]);

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteTask(task.id))}>
              <DeleteIcon />
            </IconButton>
          }
          sx={{ background: "white", my: 1, borderRadius: 2, boxShadow: 1 }}
        >
          <ListItemText primary={task.title} />
          <Chip label={task.priority} color={PriorityColor[task.priority]} sx={{ mr: 1 }} />
          {task.category === "outdoor" && (
            <>
              {weather.loading ? (
                <CircularProgress size={20} />
              ) : weather.error ? (
                <Alert severity="error" sx={{ ml: 1 }}>
                  {weather.error}
                </Alert>
              ) : weather.data ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Chip label={`${weather.data.temperature}°C`} variant="outlined" />
                  <Chip label={weather.data.weathercode} variant="outlined" />
                </Box>
              ) : null}
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;