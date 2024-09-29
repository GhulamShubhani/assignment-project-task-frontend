import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseLocalUrl } from "../utils/variable";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { Grid, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { setProjectsre } from "../redux/projectSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CreateProject from "../Component/Project/CreateProject";

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

const Home = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalProjects, setTotalProjects] = useState(0);

  const accessToken = localStorage.getItem("accessToken");
  if(!accessToken){
    navigate("/signin");
  }
  const fetchProjects = async (pageNumber = 0, limit = 5) => {
    try {
      const response = await axios.get(
        `${BaseLocalUrl}/project?page=${pageNumber + 1}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      const total = response.data?.data?.totalProjects || 0;
      const projectsData = response.data?.data?.projects || [];
      console.log(response.data?.data,"response.data?.data");
      
      setProjects(projectsData);
      setTotalProjects(total);
    } catch (error) {
      console.log("Error fetching projects:", error);
      setTotalProjects(0);
    }
  };

  useEffect(() => {
    fetchProjects(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlenavigate = (project) => {
    dispatch(setProjectsre(project));
    navigate("/projectdetailspage", { state: project });
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <HomeContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}
        />

        <Card variant="outlined" sx={{ mt: { lg: 4 } }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="View Project" {...a11yProps(0)} />
                <Tab label="Create Project" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Grid container spacing={2}>
                {projects.map((project, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                      sx={{
                        cursor: "pointer",
                        border: "1px solid",
                        borderRadius: "8px",
                        padding: "16px",
                        textAlign: "center",
                        backgroundColor: "background.paper",
                      }}
                      onClick={() => {
                        handlenavigate(project);
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {project.projectName}
                      </Typography>
                      <Typography variant="body2">
                        Description:{" "}
                        {project.projectDescription || "No Description"}
                      </Typography>
                      <Typography variant="body2">
                        Created by: {project.userDetails?.fullName || "Unknown"}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <TablePagination
                component="div"
                count={totalProjects}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Projects per page:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
                }
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <CreateProject />
            </CustomTabPanel>
          </Box>
        </Card>
      </HomeContainer>
    </AppTheme>
  );
};

export default Home;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
