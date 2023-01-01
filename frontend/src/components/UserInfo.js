/* Ref. https://github.com/mui/material-ui/blob/v5.11.2/docs/data/material/getting-started/templates/blog/MainFeaturedPost.js */

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from '@mui/material';

function UserInfo(props) {
  const { user, isSelf, handleEdit} = props;

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
      <Grid container direction='row' justifyContent='flex-start'>
        <Grid container item xs={0.3} justifyContent='flex-end  ' alignItems='flex-start'>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 4.5 },
              pr: { md: 0 },
            }}
          >
            <Stack direction="row" spacing={2}>
              <Typography component="h2" variant="h4" color="inherit" sx={{fontWeight: "600"}}>
                {user.nickname}
              </Typography>

              {isSelf &&
                <IconButton onClick={handleEdit}>
                    <EditIcon sx={{color: '#D9EAD3'}}/>
                </IconButton>
              }
            </Stack>
            
            <Typography variant="subtitle1" color="#d6adad" gutterBottom sx={{fontSize: "20px"}}>
              {`@${user.username}`}
            </Typography>
            <Typography variant="h6" color="inherit" paragraph sx={{marginTop: "15px", color: "#BEBEBE"}}>
              {user.intro && user.intro !== '' ? user.intro : "The user has no self intro ..."}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UserInfo;