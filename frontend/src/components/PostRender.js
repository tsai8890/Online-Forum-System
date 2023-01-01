import * as React from 'react';
import { useNavigate } from 'react-router-dom'
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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';

import CommentItem from './CommentItem';
import AlertDialog from './AlertDialog';

/* Ref. https://github.com/mui/material-ui/blob/v5.11.2/docs/data/material/getting-started/templates/album/Album.js */
const PostRender = ({ 
    post, 
    comment: myComment, 
    comments, 
    setComment, 
    handleSubmit, 
    handleEdit,
    handleDelete, 
    handlePush,
    handleDown,
    hasPush,
    hasDown,
    isSelfPost 
}) => {
    let { title, UID, nickname, content, timestamp, rating } = post
    const date = new Date(parseInt(timestamp)).toLocaleString();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

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
                    variant="h4"
                    color="text.primary"
                >
                    {title}
                </Typography>
                <Grid container
                    justifyContent="space-between"
                    alignItems="baseline"
                >
                    <Grid container item alignItems='center' spacing={1} xs={5}>
                        <Grid item>
                            <Chip 
                                icon={<FaceIcon />} 
                                label={nickname} 
                                color='primary'
                                onClick={() => navigate(`/profile/${UID}`)}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="p" color="text.secondary">
                                {`${date}`}
                            </Typography>
                        </Grid>
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
                                    <IconButton onClick={() => {setOpen(true)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <AlertDialog 
                                    content='Do you really want to delete the post?'
                                    open={open}
                                    setOpen={setOpen}
                                    handleAgree={handleDelete}
                                />
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
                <Box component="div" paddingBottom={5}>
                    <Grid container direction="row" justifyContent="space-between">
                        <Grid item xs={0.8}>
                            <Stack spacing={-1} alignItems='center'>
                                <IconButton onClick={handlePush} color={hasPush ? 'primary' : ''}>
                                    <KeyboardArrowUpIcon fontSize='large'/>
                                </IconButton>
                                <Typography variant='h6'>
                                    {rating.push.total - rating.down.total}
                                </Typography>
                                <IconButton onClick={handleDown} color={hasDown ? 'primary' : ''}>
                                    <KeyboardArrowDownIcon fontSize='large'/>
                                </IconButton>
                            </Stack>
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant="h5" color="#423c3c" paragraph sx={{whiteSpace: "pre-wrap"}}>
                                {content}
                            </Typography>
                        </Grid>
                    </Grid>
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
                            authorUID={UID}
                        />
                    )}
                </Grid>
            </Container>
        </Box>
	);
}

export default PostRender;