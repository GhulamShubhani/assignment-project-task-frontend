import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Sitemark from "./SitemarkIcon";
import { BaseLocalUrl, Colors } from "../utils/variable";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");


  // Utility function to decode JWT token
const decodeJWT = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1])); // Decode payload
  } catch (e) {
    return null;
  }
};

// Function to check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  
  const decoded = decodeJWT(token);
  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return decoded.exp < currentTime;
};



const refreshAccessToken = async (refreshToken) => {
  try {
    const logoutResponse = await axios.post(
      `${BaseLocalUrl}/user/refreshToken`,
      {refreshToken},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );
    console.log(logoutResponse.data,"[[[[[[[[[[[");
console.log(logoutResponse.data.data.accessToken,"[]]]]]]]]]");


    if (logoutResponse.data.data.accessToken) {
      // Save new access token to localStorage
      localStorage.setItem('accessToken', logoutResponse.data.data.accessToken);
      return logoutResponse.data.data.accessToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error refreshing access token', error);
    return null;
  }
};


  const manageAuthState = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    if (isTokenExpired(accessToken)) {
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        console.log(newAccessToken,"newAccessToken");
        
        if (newAccessToken) {
          navigate("/");
        } else {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    } else {
    }
  };
  
  // // Function to show logout button
  // const showLogoutButton = () => {
  //   // Show the logout button
  //   document.getElementById('logoutButton').style.display = 'block';
  //   document.getElementById('loginButton').style.display = 'none';
  // };
  
 
  

  React.useEffect(() => {
    if(!refreshToken || refreshToken=='undefined' ){
    // if(!refreshToken){
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate("/signin");
    }else{
      manageAuthState();
    }
  }, []);

  const handleLogout = async () => {
    try {
      const logoutResponse = await axios.post(
        `${BaseLocalUrl}/user/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (logoutResponse.data.success) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate("/signin");
      }
    } catch (error) {
      console.error(
        "Logout error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Sitemark />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                sx={{ color: Colors.info }}
                size="small"
                onClick={() => navigate("/")}
              >
                Project
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {!accessToken && (
              <Button
                sx={{ color: Colors.info }}
                variant="text"
                size="small"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign in
              </Button>
            )}

            {accessToken ? (
              <Button
                sx={{ color: "#FCFCFC", backgroundColor: "rgb(11, 14, 20)" }}
                variant="contained"
                size="small"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                sx={{ color: "#FCFCFC", backgroundColor: "rgb(11, 14, 20)" }}
                variant="contained"
                size="small"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </Button>
            )}
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>project</MenuItem>

                <MenuItem>
                  {accessToken ? (
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={handleLogout}
                    >
                      Sign up
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Sign up
                    </Button>
                  )}
                </MenuItem>
                <MenuItem>
                  {!accessToken && (
                    <Button
                      color="primary"
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        navigate("/signin");
                      }}
                    >
                      Sign in
                    </Button>
                  )}
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
