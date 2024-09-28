import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme,testcolor }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: testcolor || '#1a90ff', // Use the color prop here
    ...theme.applyStyles('dark', {
      backgroundColor: testcolor || '#308fe8',
    }),
  },
}));



export default function CustomizedProgressBars({percentage,color}) {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      {/* <FacebookCircularProgress /> */}
      {/* <GradientCircularProgress /> */}
      <br />
      <BorderLinearProgress variant="determinate" value={percentage} testcolor={color}  />
    </Stack>
  );
}