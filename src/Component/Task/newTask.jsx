import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseLocalUrl } from "../../utils/variable";
import { useSelector } from "react-redux";

const CreateTask = () => {
  const navigate = useNavigate();
  const { projects } = useSelector((s) => s.project);

  const [taskNameError, setTaskNameError] = useState(false);
  const [taskNameErrorMessage, setTaskNameErrorMessage] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Low");
  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateInputs();
    if (!isValid) return;

    try {
      const data = new FormData(event.currentTarget);
      const res = await axios.post(
        `${BaseLocalUrl}/task`,
        {
          taskName: data.get("taskName"),
          status: data.get("status"),
          priority: data.get("priority"),
          projectId: projects.projectId,
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
    const taskName = document.getElementById("taskName");
    let isValid = true;

    if (!taskName.value.length) {
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
        Create Task
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="taskName">Task Name</FormLabel>
          <TextField
            error={taskNameError}
            helperText={taskNameErrorMessage}
            id="taskName"
            name="taskName"
            placeholder="Task Name"
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

        {/* Submit Button */}
        <Button type="submit" fullWidth variant="contained">
          Create new Task
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTask;
