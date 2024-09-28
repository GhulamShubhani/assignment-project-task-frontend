import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseLocalUrl } from "../../utils/variable";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../shared-theme/AppTheme";
import ColorModeSelect from "../../shared-theme/ColorModeSelect";
import { Button, Grid, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { setProjectsre } from "../../redux/projectSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

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

const TaskDetailsPageContainer = styled(Stack)(({ theme }) => ({
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

const TaskDetailsPage = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useDispatch();

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalProjects, setTotalProjects] = useState(0);

  const accessToken = localStorage.getItem("accessToken");

  const handleDeleteTask = async () => {
    try {
      const response = await axios.delete(
        `${BaseLocalUrl}/task/${state.taskId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/");
      }
    } catch {}
  };
  const handleEditTask = async () => {
    navigate("/edit-task", { state });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <TaskDetailsPageContainer
        direction="column"
        justifyContent="space-between"
      >
        <ColorModeSelect
          sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}
        />
        <Card variant="outlined" sx={{ mt: { lg: 4 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  cursor: "pointer",
                  border: "1px solid",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                  backgroundColor: "background.paper",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {state.projectName}
                </Typography>
                <Typography variant="body2">
                  Description: {state.projectDescription || "No Description"}
                </Typography>
                <Typography variant="body2">
                  Created by: {state.userDetails?.fullName || "Unknown"}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  my: 2,
                  cursor: "pointer",
                  border: "1px solid",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                  backgroundColor: "background.paper",
                  justifyContent: "space-evenly",
                }}
              >
                <Button variant="outlined" onClick={handleEditTask}>
                  Edit Task
                </Button>
                <Button variant="outlined" onClick={handleDeleteTask}>
                  Delete Task
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </TaskDetailsPageContainer>
    </AppTheme>
  );
};

export default TaskDetailsPage;
