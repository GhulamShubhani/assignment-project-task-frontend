import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseLocalUrl, BaseUrl } from "../../utils/variable";

const CreateProject = () => {
  const navigate = useNavigate();
  const [projectDescription, setProjectDescription] = React.useState(false);
  const [projectDescriptionMessage, setProjectDescriptionMessage] =
    React.useState("");
  const [projectNameError, setProjectNameError] = React.useState(false);
  const [projectNameErrorMessage, setProjectNameErrorMessage] =
    React.useState("");
  const [open, setOpen] = React.useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);
      const res = await axios.post(
        `${BaseLocalUrl}/project`,
        {
          projectName: data.get("projectName"),
          projectDescription: data.get("projectDescription"),
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
      navigate("/");
    } catch (error) {
    } finally {
    }
  };

  const validateInputs = (props) => {
    const projectName = document.getElementById("projectName");
    const projectDescription = document.getElementById("projectDescription");

    let isValid = true;

    if (!projectName.value.length) {
      setProjectNameError(true);
      setProjectNameErrorMessage("Please enter a valid Project Name.");
      isValid = false;
    } else {
      setProjectNameError(false);
      setProjectNameErrorMessage("");
    }

    if (!projectDescription.value || projectDescription.value.length < 3) {
      setProjectDescription(true);
      setProjectDescriptionMessage("project desc must be at  long.");
      isValid = false;
    } else {
      setProjectDescription(false);
      setProjectDescriptionMessage("");
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
        Create Project
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
          <FormLabel htmlFor="email">Project Name</FormLabel>
          <TextField
            error={projectNameError}
            helperText={projectNameErrorMessage}
            id="projectName"
            type="text"
            name="projectName"
            placeholder="project1"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={projectNameError ? "error" : "primary"}
            sx={{ ariaLabel: "projectName" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Description</FormLabel>
          <TextField
            error={projectDescription}
            helperText={projectDescriptionMessage}
            name="projectDescription"
            placeholder="desc"
            type="text"
            id="projectDescription"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={projectDescription ? "error" : "primary"}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Create new Project
        </Button>
      </Box>
    </Box>
  );
};

export default CreateProject;
