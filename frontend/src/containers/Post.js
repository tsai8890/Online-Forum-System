import { useNavigate, useParams, goBack } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';

import { 
    CREATE_COMMENT_MUTATION, 
    DELETE_POST_MUTATION, 
    POST_BY_PID_QUERY 
} from '../graphql';
import PostRender from '../components/PostRender';
import { useEffect, useState } from 'react';
import { useUser } from '../containers/hooks/useUser';


const Post = () => {
    const { id: PID } = useParams();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { nickname, UID, isLogin, setStatus } = useUser();

    const navigate = useNavigate();

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
    const [deletePost] = useMutation(DELETE_POST_MUTATION);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isLogin || !comment) {
            setStatus({
                type: "error",
                msg: "You should login first"
            });
            navigate("/login");
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

    const handleDelete = async () => {
        if (post.UID !== UID) {
            setStatus({
                type: "error",
                msg: "Permission denied"
            })
            return;
        }

        const { 
            data: { deletePost: { success, msg }}
        } = await deletePost({
            variables: {
                PID
            }
        });

        if (success) {
            setStatus({
                type: "success",
                msg: "Successfully deleted"
            })
            navigate(-1);
        }
        else if (msg === 'not existed') {
            setStatus({
                type: "error",
                msg: "Post already deleted",
            })
        }
        else {
            setStatus({
                type: "error",
                msg: "Deletion failed"
            })
        }
    }


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
            handleDelete={handleDelete}
            isSelfPost={UID === post.UID}
        />
    )
}

export default Post;