import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { BaseLocalUrl } from "../../utils/variable";

import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../shared-theme/AppTheme";
import ColorModeSelect from "../../shared-theme/ColorModeSelect";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "90%",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const TaskContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: "10vh",
  width: "100%",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const EditTask = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [taskName, setTaskName] = useState(state.taskName || "");
  const [status, setStatus] = useState(state.status || "To Do");
  const [priority, setPriority] = useState(state.priority || "Low");
  const [taskNameError, setTaskNameError] = useState(false);
  const [taskNameErrorMessage, setTaskNameErrorMessage] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (state) {
      setTaskName(state.taskName);
      setStatus(state.status);
      setPriority(state.priority);
    }
  }, [state]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateInputs();
    if (!isValid) return;

    try {
      const res = await axios.put(
        `${BaseLocalUrl}/task/${state.taskId}`,
        {
          taskName,
          status,
          priority,
          projectId: state.projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!taskName.length) {
      setTaskNameError(true);
      setTaskNameErrorMessage("Please enter a valid Task Name.");
      isValid = false;
    } else {
      setTaskNameError(false);
      setTaskNameErrorMessage("");
    }
    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <TaskContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}
        />

        <Card variant="outlined" sx={{ mt: { lg: 4 } }}>
          
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                Edit Task
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
                
                <FormControl>
                  <FormLabel htmlFor="taskName">Task Name</FormLabel>
                  <TextField
                    error={taskNameError}
                    helperText={taskNameErrorMessage}
                    id="taskName"
                    name="taskName"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    color={taskNameError ? "error" : "primary"}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <MenuItem value="To Do">To Do</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel htmlFor="priority">Priority</FormLabel>
                  <Select
                    id="priority"
                    name="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
                <Button type="submit" fullWidth variant="contained">
                  Update Task
                </Button>
              </Box>
            </Box>
       
        </Card>
      </TaskContainer>
    </AppTheme>
  );
};

export default EditTask;
