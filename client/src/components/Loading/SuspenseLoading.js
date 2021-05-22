import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const SuspenseLoading = () => {
  return (
    <Box style={{ textAlign: 'center', padding: '8px 0' }}>
      <Typography color="primary">Loading...</Typography>
    </Box>
  );
};

export default SuspenseLoading;
