import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';

import { POSTS_BY_UID_QUERY, USER_BY_UID_QUERY } from '../graphql';
import FeaturedPost from '../components/FeaturedPost';
import UserInfo from '../components/MainFeaturedPost';

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


    const { postsByUID: posts } = postsLoading || !postsData 
        ? { postsByUID: [] } 
        : postsData;

    const { userByUID: user } = userLoading || !userData
        ? { userByUID: [] }
        : userData;

    return (
        <>  
            <UserInfo user={user} />
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

export default Profile;