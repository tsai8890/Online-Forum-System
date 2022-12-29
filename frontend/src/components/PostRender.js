import * as React from 'react';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import CommentItem from './CommentItem';


/* Ref. https://github.com/mui/material-ui/blob/v5.11.2/docs/data/material/getting-started/templates/album/Album.js */
const PostRender = ({ post, comment: myComment, comments, setComment, handleSubmit }) => {
    let { title, username, nickname, content, timestamp } = post
    
    const date = new Date(parseInt(timestamp)).toLocaleString();

	return (
		<Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
        >
            <Container maxWidth="md">
                <Typography
                    component="h1"
                    variant="h2"
                    color="text.primary"
                    gutterBottom
                >
                    {title}
                </Typography>
                <Typography variant="p" color="text.secondary">
                    {`${date} by ${nickname}`}
                </Typography>
                <Typography variant="p" color="#423c3c" paragraph>
                    {content}
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Stack direction="row" spacing={2}>
                        <TextField
                            id="outlined-textarea"
                            value={myComment}
                            label="Your comment"
                            placeholder="Type something ..."
                            multiline
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            onInput={e => setComment(e.target.value)}
                        />
                        <Button 
                            variant="outlined" 
                            endIcon={<SendIcon />}
                            type="submit"
                        >
                            Send
                        </Button>
                    </Stack>
                </Box>
                <br />
                <Divider variant="middle" />
                <br />
                <Grid container spacing={1} 
                    justifyContent="center"
                    alignItems="center"
                >
                    {comments.map((comment) =>
                        <CommentItem 
                            key={comment.CID}
                            comment={comment}
                        />
                    )}
                </Grid>
            </Container>
        </Box>
	);
}

export default PostRender;