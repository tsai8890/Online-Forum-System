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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CommentItem from './CommentItem';


/* Ref. https://github.com/mui/material-ui/blob/v5.11.2/docs/data/material/getting-started/templates/album/Album.js */
const PostRender = ({ 
    post, 
    comment: myComment, 
    comments, 
    setComment, 
    handleSubmit, 
    handleEdit,
    handleDelete, 
    isSelfPost 
}) => {
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
                >
                    {title}
                </Typography>
                <Grid container
                    justifyContent="space-between"
                    alignItems="baseline"
                >
                    <Grid item>
                        <Typography variant="p" color="text.secondary">
                            {`${date} by ${nickname}`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {isSelfPost
                            ? <>
                                <Tooltip title="Edit" placement="top">
                                    <IconButton onClick={handleEdit}>
                                        <EditIcon color="primary"/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" placement="top">
                                    <IconButton onClick={handleDelete}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                            : null
                        }
                    </Grid>
                </Grid>

                <Divider 
                    variant="fullWidth" 
                    sx={{ 
                        marginTop: isSelfPost ? "0px" : "10px",
                        marginBottom: "10px",
                        bgcolor: "silver"
                    }} 
                />
                <Box component="div" paddingBottom={20}>
                    <Typography variant="h5" color="#423c3c" paragraph sx={{whiteSpace: "pre"}}>
                        {content}
                    </Typography>
                </Box>
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
                <Grid container spacing={1} 
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        marginTop: "10px"
                    }}
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