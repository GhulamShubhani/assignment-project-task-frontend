import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
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

const HomeContainer = styled(Stack)(({ theme }) => ({
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

const EditProject = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [projectName, setProjectName] = React.useState(
    state?.projectName || ""
  );
  const [projectDescription, setProjectDescription] = React.useState(
    state?.projectDescription || ""
  );

  const [projectNameError, setProjectNameError] = React.useState(false);
  const [projectNameErrorMessage, setProjectNameErrorMessage] =
    React.useState("");
  const [projectDescriptionError, setProjectDescriptionError] =
    React.useState(false);
  const [projectDescriptionMessage, setProjectDescriptionMessage] =
    React.useState("");

  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    try {
      const res = await axios.put(
        `${BaseLocalUrl}/project/${state.projectId}`,
        {
          projectName,
          projectDescription,
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
      console.log("Error updating project:", error);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!projectName.length) {
      setProjectNameError(true);
      setProjectNameErrorMessage("Please enter a valid Project Name.");
      isValid = false;
    } else {
      setProjectNameError(false);
      setProjectNameErrorMessage("");
    }

    if (!projectDescription.length || projectDescription.length < 3) {
      setProjectDescriptionError(true);
      setProjectDescriptionMessage(
        "Project description must be at least 3 characters long."
      );
      isValid = false;
    } else {
      setProjectDescriptionError(false);
      setProjectDescriptionMessage("");
    }

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <HomeContainer direction="column" justifyContent="space-between">
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
              Edit Project
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
                <TextField
                  error={projectNameError}
                  helperText={projectNameErrorMessage}
                  id="projectName"
                  type="text"
                  name="projectName"
                  label="Project Name"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
              <FormControl>
                <TextField
                  error={projectDescriptionError}
                  helperText={projectDescriptionMessage}
                  id="projectDescription"
                  type="text"
                  name="projectDescription"
                  label="Project Description"
                  placeholder="Enter project description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
              <Button type="submit" fullWidth variant="contained">
                Update Project
              </Button>
            </Box>
          </Box>
        </Card>
      </HomeContainer>
    </AppTheme>
  );
};

export default EditProject;
