import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'

import { POSTS_BY_UID_QUERY, USER_BY_UID_QUERY } from '../graphql';
import PostItem from '../components/PostItem';
import UserInfo from '../components/UserInfo';
import { useUser } from './hooks/useUser';

const sortPosts = (posts) => {
    let sortPosts = JSON.parse(JSON.stringify(posts));
    sortPosts.sort((postA, postB) => {
        const valA = postA.rating.push.total - postA.rating.down.total;
        const valB = postB.rating.push.total - postB.rating.down.total;
        if (valA !== valB)
            return valA < valB ? 1 : -1;
        else
            return parseInt(postA.timestamp) < parseInt(postB.timestamp) ? 1 : -1;
    })
    return sortPosts;
}

const Profile = () => {
    const { id: UID } = useParams();
    const { UID: selfUID } = useUser();
    const navigate = useNavigate();
    
    const {
        loading: postsLoading, data: postsData
    } = useQuery(POSTS_BY_UID_QUERY, {
        variables: {UID},
        fetchPolicy: 'cache-and-network',
    });

    const {
        loading: userLoading, data: userData
    } = useQuery(USER_BY_UID_QUERY, {
        variables: {UID},
        fetchPolicy: 'cache-and-network',
    });


    let { postsByUID: posts } = postsLoading
        ? { postsByUID: [] } 
        : postsData;

    posts = sortPosts(posts).slice(0, 3);

    const { userByUID: user } = userLoading
        ? { userByUID: [] }
        : userData;

    const handleEdit = () => {
        navigate('/editprofile');
    }

    return (
        <>  
            <UserInfo user={user} isSelf={UID === selfUID} handleEdit={handleEdit}/>
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
                    marginTop: "20px"
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