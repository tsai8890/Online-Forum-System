import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';

import { POSTS_QUERY } from '../graphql';
import PostItem from '../components/PostItem';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const Posts = () => {
    const navigate = useNavigate();
    
    const {
        loading, error, data: postsData
    } = useQuery(POSTS_QUERY);

    const { posts } = loading ? { posts: [] } : postsData;

    return (
        <>
            <Grid container 
                justifyContent="center" 
                wrap="nowrap"
            >
                <Grid container item
                    justifyContent="space-between"
                    xs={7}
                    sx={{
                        margin: "20px", 
                    }}
                >
                    <Grid item>
                        <Typography variant="h4" >
                            All Posts
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button variant="outlined" onClick={()=>navigate("/createPost")}>
                            Write 
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={1} 
                justifyContent="center"
                alignItems="center"
            >
                {posts.map((post, index) =>
                    <PostItem 
                        key={post.PID} 
                        post={post} 
                        onClick={() => navigate(`/post/${post.PID}`)} 
                    />
                )}
            </Grid>
        </>
    )
}

export default Posts;