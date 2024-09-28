import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  IconButton,
  Box,
  Container,
  CardHeader,
  TextField,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CustomizedProgressBars from "../Component/PrograssBar";
import { countryData } from "../helper/countryData";
import finland from "../assets/finland4.png";

// import CountryList from 'country-list-with-dial-code-and-flag'
import Flag from "react-world-flags";

const ProjectItem = ({ project, isExpanded, toggleExpand }) => {
  const [selectedFromLanguage, setSelectedFromLanguage] = useState("");
  const [selectedToLanguage, setSelectedToLanguage] = useState("Israel");

  const handleFromLanguageChange = (event) => {
    setSelectedFromLanguage(event.target.value);
  };

  const handleToLanguageChange = (event) => {
    setSelectedToLanguage(event.target.value);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: 2,
        boxShadow: "none",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
      }}
    >
      <CardContent sx={{ border: "none" }}>
        <Grid container alignItems="center">
          <Grid item xs={2} sx={{ borderBottom: "none" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {project.name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <CustomizedProgressBars
                percentage={project.progress}
                color={project.progressColor}
              />
              <Typography
                variant="body2"
                style={{ color: project.progressColor, textAlign: "center" }}
              >
                {`${project.progress}%`}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              px: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  // height: "50px",
                  width: "70px",
                  border: "none",
                  boxShadow: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={finland}
                  style={{ width: "100%" }}
                  alt="Finland Flag"
                />
              </Box>

              <Typography
                sx={{ mx: 1, alignSelf: "center", fontWeight: "bold" }}
              >
                to
              </Typography>

              <TextField
                select
                fullWidth
                value={selectedToLanguage}
                onChange={handleToLanguageChange}
                sx={{
                  // height: "50px",
                  width: "120px",
                  border: "none",
                  boxShadow: "none",
                  "& fieldset": {
                    border: "none",
                  },
                  "& .MuiOutlinedInput-input": {
                    paddingRight: "0px",
                  },
                }}
              >
                {countryData.map((val) => (
                  <MenuItem key={val.code} value={val.country}>
                    <Flag
                      code={val.code}
                      style={{
                        width: "70px",
                        margin: "0px",
                        padding: "0px",
                        paddingRight: "0px",
                      }}
                    />
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", mt: 1, fontWeight: "bold" }}
            >
              {`${project.translation.from} to ${selectedToLanguage}`}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              {project.estimatedValue}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={toggleExpand}
              sx={{ height: "30px", width: "30px", backgroundColor: "#E0E7FF" }}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Grid>
        </Grid>
        {isExpanded && (
          <div
            style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={2.4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2">Company</Typography>
                <Typography variant="h6">{project.company}</Typography>
              </Grid>
              <Grid
                item
                xs={2.4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2">Client</Typography>
                <Typography variant="h6">{project.client}</Typography>
              </Grid>
              <Grid
                item
                xs={2.4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2">Status</Typography>
                <Typography variant="h6">{project.status}</Typography>
              </Grid>
              <Grid
                item
                xs={2.4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2">Translation</Typography>
                <Typography variant="h6">
                  {`${project.translation?.from} to ${project.translation?.to}`}{" "}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2.4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2">Project priority</Typography>
                <Typography variant="h6">{project.priority}</Typography>
              </Grid>
              <Grid
                item
                xs={2.4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2">Date</Typography>
                <Typography variant="h6">{project.date}</Typography>
              </Grid>

              <Grid
                item
                xs={2.4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2">Handled By</Typography>
                <Typography variant="h6">{project.handler}</Typography>
              </Grid>
              <Grid
                item
                xs={2.4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2">Stage</Typography>
                <Typography variant="h6">{project.stage}</Typography>
              </Grid>
              <Grid
                item
                xs={2.4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2">Resources needed</Typography>
                <Typography variant="h6">{project.resources}</Typography>
              </Grid>

              <Grid item xs={2.4}>
                <Button variant="contained">Read more</Button>
              </Grid>
            </Grid>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ProjectsPage = () => {
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const projects = [
 
    {
      id: 1,
      name: "Project 1",
      progress: 70,
      progressColor: "green",
      translation: { from: "Farsi", to: "Hebrew" },
      estimatedValue: "Lorem ipsum",
      company: "ABC",
      client: "Micheal Smith",
      status: "20% progress",
      date: "12/09/2024",
      handler: "Lorem Ipsum",
      stage: "Lorem Ipsum",
      resources: "Lorem Ipsum",
      priority: "High",
    },
    {
      id: 1,
      name: "Project 2",
      progress: 40,
      progressColor: "red",
      translation: { from: "Farsi", to: "Hebrew" },
      estimatedValue: "Lorem ipsum",
      company: "ABC",
      client: "Ghulam",
      status: "40% progress",
      date: "12/09/2024",
      handler: "Lorem Ipsum",
      stage: "Lorem Ipsum",
      resources: "Lorem Ipsum",
      priority: "High",
    },
    {
      id: 1,
      name: "Project 3",
      progress: 90,
      progressColor: "yellow",
      translation: { from: "Farsi", to: "Hebrew" },
      estimatedValue: "Lorem ipsum",
      company: "ABC",
      client: "Shubhani",
      status: "20% progress",
      date: "12/09/2024",
      handler: "Lorem Ipsum",
      stage: "Lorem Ipsum",
      resources: "Lorem Ipsum",
      priority: "High",
    },
    {
      id: 1,
      name: "Project 4",
      progress: 50,
      progressColor: "green",
      translation: { from: "Farsi", to: "Hebrew" },
      estimatedValue: "Lorem ipsum",
      company: "ABC",
      client: "Test",
      status: "20% progress",
      date: "12/09/2024",
      handler: "Lorem Ipsum",
      stage: "Lorem Ipsum",
      resources: "Lorem Ipsum",
      priority: "High",
    },
    {
      id: 1,
      name: "Project 5",
      progress: 30,
      progressColor: "blue",
      translation: { from: "Farsi", to: "Hebrew" },
      estimatedValue: "Lorem ipsum",
      company: "ABC",
      client: "xyz",
      status: "20% progress",
      date: "12/09/2024",
      handler: "Lorem Ipsum",
      stage: "Lorem Ipsum",
      resources: "Lorem Ipsum",
      priority: "High",
    },
  ];

  const handleToggleExpand = (id) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  return (
    <Container sx={{ backgroundColor: "#fff", my: 4, borderRadius: "10px" }}>
      <Grid
        container
        alignItems="center"
        sx={{ py: 3, borderBottom: "1px solid #E0E7FF" }}
      >
        <Grid item xs={2}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Project
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" style={{ textAlign: "center" }}>
            Progress
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Translation
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body2" sx={{ textAlign: "end" }}>
            Project estimaed value
          </Typography>
        </Grid>
      </Grid>
      {projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          isExpanded={expandedProjectId === project.id}
          toggleExpand={() => handleToggleExpand(project.id)}
        />
      ))}
    </Container>
  );
};

export default ProjectsPage;
