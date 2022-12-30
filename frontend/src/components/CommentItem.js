import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';

/* Ref. https://github.com/mui/material-ui/blob/v5.11.2/docs/data/material/getting-started/templates/blog/FeaturedPost.js */
const CommentItem = ({ comment }) => {
	let { nickname, message } = comment;
    const navigate = useNavigate();

	return (
		<Grid item xs={12}>
            <Stack direction="row" spacing={1}>
                <Chip icon={<FaceIcon />} label={nickname} variant="outlined" />
                <Typography variant="p" color="text.secondary" paragraph style={{ wordWrap: "break-word" }} alignSelf="center">
                    {message}
                </Typography>
            </Stack>
		</Grid>
	);
}

export default CommentItem;