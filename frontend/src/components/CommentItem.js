import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import Stack from '@mui/material/Stack';

/* Ref. https://github.com/mui/material-ui/blob/v5.11.2/docs/data/material/getting-started/templates/blog/FeaturedPost.js */
const CommentItem = ({ comment, authorUID }) => {
	let { nickname, message, UID } = comment;
    const navigate = useNavigate();

    const authorComment = authorUID === UID;

	return (
		<Grid item xs={12}>
            <Stack direction="row" spacing={1} sx={{ marginBottom: "10px"}}>
                <Grid sx={{ width: "120px" }}>
                    <Chip 
                        icon={<FaceIcon />} 
                        label={nickname} 
                        variant={authorComment ? 'filled' : 'outlined'}
                        color={authorComment ? 'primary' : 'default'}
                        
                        onClick={() => navigate(`/profile/${UID}`)}
                    />
                </Grid>
                <Typography 
                    variant="p" 
                    color="text.secondary" 
                    alignSelf="center"
                    sx={{
                        whiteSpace: "pre-wrap", 
                        wordWrap: "break-word", 
                        width: "600px", 
                    }}
                >
                    {message}
                </Typography>
            </Stack>
		</Grid>
	);
}

export default CommentItem;