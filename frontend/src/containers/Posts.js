import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';

import { POSTS_QUERY } from '../graphql';
import FeaturedPost from '../components/FeaturedPost';

const Posts = () => {
    const navigate = useNavigate();

    const {
        loading, error, data: postsData
    } = useQuery(POSTS_QUERY);

    const { posts } = loading ? { posts: [] } : postsData;

    return (
        <>
            <Grid container spacing={1} 
                justifyContent="center"
                alignItems="center"
            >
                {posts.map((post, index) =>
                    <FeaturedPost 
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