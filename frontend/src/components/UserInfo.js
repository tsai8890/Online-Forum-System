/* Ref. https://github.com/mui/material-ui/blob/v5.11.2/docs/data/material/getting-started/templates/blog/MainFeaturedPost.js */

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function UserInfo(props) {
  const { user } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the priority of the hero background image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={12}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <div>
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {user.nickname}
                </Typography>
                <Typography variant="subtitle1" color="#d6adad">
                {`@${user.username}`}
                </Typography>
            </div>
            <Typography variant="h6" color="inherit" paragraph>
              {user.intro ?? "The user has no self intro ..."}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UserInfo;