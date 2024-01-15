// LoadingOverlay.js
import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
const LoadingOverLay = ({ show }) => (
  <Backdrop
    sx={{
      backgroundColor: 'rgba(73, 75, 77, 0.1)',
      color: 'blue',
      zIndex: (theme) => theme.zIndex.drawer + 1,
      position: 'absolute',
    }}
    open={show}
  >
    {/* <CircularProgress color="inherit" /> */}
    <CircularProgress/>
  </Backdrop>
);

export default LoadingOverLay;
