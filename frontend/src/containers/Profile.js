import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'

import { POSTS_BY_UID_QUERY, USER_BY_UID_QUERY } from '../graphql';
import PostItem from '../components/PostItem';
import UserInfo from '../components/UserInfo';

const sortPosts = (posts) => {
    let sortPosts = JSON.parse(JSON.stringify(posts));
    sortPosts.sort((postA, postB) => {
        if (postA.rating.push.total != postB.rating.push.total)
            return postA.rating.push.total > postB.rating.push.total ? 1 : -1;
        else
            return parseInt(postA.timestamp) < parseInt(postB.timestamp) ? 1 : -1;
    })
    return sortPosts;
}

const Profile = () => {
    const { id: UID } = useParams();
    const navigate = useNavigate();
    
    const {
        loading: postsLoading, data: postsData
    } = useQuery(POSTS_BY_UID_QUERY, {
        variables: {UID},
    });

    const {
        loading: userLoading, data: userData
    } = useQuery(USER_BY_UID_QUERY, {
        variables: {UID},
    });


    let { postsByUID: posts } = postsLoading
        ? { postsByUID: [] } 
        : postsData;

    posts = sortPosts(posts).slice(0, 3);

    const { userByUID: user } = userLoading
        ? { userByUID: [] }
        : userData;

    return (
        <>  
            <UserInfo user={user} />
            <Grid container spacing={1} 
                justifyContent="center"
                alignItems="center"
            >
                {posts.map((post) =>
                    <PostItem 
                        key={post.PID} 
                        post={post} 
                        onClick={() => navigate(`/post/${post.PID}`)} 
                    />
                )}
            </Grid>
            <Grid container
                justifyContent="center"
                sx={{
                    margin: "20px"
                }}
            >
                <Button variant="outlined" onClick={() => navigate(`/posts/${UID}`)} >
                    More
                </Button>
            </Grid>
        </>
    )
}

export default Profile;