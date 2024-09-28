import React from 'react';
import Box from '@mui/material/Box';
import gs from '../assets/gs-design.avif'; // Ensure the path is correct

export default function SitemarkIcon() {
  return (
    <Box
      component="img"
      src={gs}
      alt="GS Design"
      sx={{ height: 50, width: 100, mr: 0 }} // Adjust the size accordingly
    />
  );
}
