import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';

import { POSTS_BY_UID_QUERY, USER_BY_UID_QUERY } from '../graphql';
import PostItem from '../components/PostItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const sortPosts = (posts) => {
    let sortPosts = JSON.parse(JSON.stringify(posts));
    sortPosts.sort((postA, postB) => {
        return parseInt(postA.timestamp) < parseInt(postB.timestamp) ? 1 : -1;
    })
    return sortPosts;
}

const UserPosts = () => {
    const navigate = useNavigate();
    const { id: UID } = useParams();

    const {
        loading: postLoading, data: postsData
    } = useQuery(POSTS_BY_UID_QUERY, {
        variables: {
            UID
        },
        fetchPolicy: 'cache-and-network',
    });

    const {
        loading: userLoading, data: userData
    } = useQuery(USER_BY_UID_QUERY, {
        variables: {
            UID
        }
    });

    let { postsByUID: posts } = postLoading ? { postsByUID: [] } : postsData;
    const { userByUID: user } = userLoading ? { userByUID: [] } : userData;

    posts = sortPosts(posts);

    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    {userLoading ? '' : user.nickname[0]}
                </Avatar>
            </Box>
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

export default UserPosts;