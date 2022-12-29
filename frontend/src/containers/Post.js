import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';

import { CREATE_COMMENT_MUTATION, POST_BY_PID_QUERY } from '../graphql';
import PostRender from '../components/PostRender';
import { useEffect, useState } from 'react';
import { useUser } from '../containers/hooks/useUser';


const Post = () => {
    const { id: PID } = useParams();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { nickname, UID, isLogin } = useUser();

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isLogin || !comment) {
            return;
        }

        const { data: { createComment: newComment }} = await createComment({
            variables: {
                PID,
                UID,
                comment,
            }
        })

        setComments(() => [...comments, newComment]);
        setComment('');
    }

    const { loading, data: postData } = useQuery(POST_BY_PID_QUERY, {
        variables: {
            PID
        }
    });

    const { postByPID: post } = loading ? { postByPID: [] } : postData;

    useEffect(() => {
        if (!loading)
            setComments(post.comments);
    }, [loading])

    return (
        post.length === 0 ? null : <PostRender
            post={post} 
            comment={comment}
            setComment={setComment}
            comments={comments}
            handleSubmit={handleSubmit}
        />
    )
}

export default Post;