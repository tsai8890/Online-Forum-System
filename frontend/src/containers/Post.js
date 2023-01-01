import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';

import { 
    CREATE_COMMENT_MUTATION, 
    DELETE_POST_MUTATION, 
    POST_BY_PID_QUERY,
    UPDATE_RATING_MUTATION
} from '../graphql';
import PostRender from '../components/PostRender';
import { useEffect, useState } from 'react';
import { useUser } from '../containers/hooks/useUser';


const Post = () => {
    const { id: PID } = useParams();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { UID, isLogin, setStatus } = useUser();

    const navigate = useNavigate();

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
    const [deletePost] = useMutation(DELETE_POST_MUTATION);
    const [updateRating] = useMutation(UPDATE_RATING_MUTATION);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isLogin) {
            setStatus({
                type: "error",
                msg: "You should login first"
            });
            navigate("/login");
            return;
        }
        if (!comment) {
            setStatus({
                type: "error",
                msg: "Please type something"
            });
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

    const { loading, data: postData, refetch } = useQuery(POST_BY_PID_QUERY, {
        variables: {
            PID
        },
        fetchPolicy: 'cache-and-network'
    });

    const { postByPID: post } = loading ? { postByPID: [] } : postData;

    const handleEdit = async () => {
        navigate(`/editpost/${PID}`)
    }

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
            navigate(`/posts/${UID}`);
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

    const handlePush = async () => {
        if (!isLogin) {
            setStatus({
                type: "error",
                msg: "You should login first"
            });
            navigate('/login');
            return;
        }
        const action = post.rating.push.stat.includes(UID) 
            ? 'push-cancel' : 'push';
        const {data: {updateRating: {success}}} = await updateRating({
            variables: {
                UID,
                PID,
                action,
            }
        })

        if (success) {
            refetch();
        }
        else {
            setStatus({
                type: "error",
                msg: "Unknown error occurred"
            })
        }
    }

    const handleDown = async () => {
        if (!isLogin) {
            setStatus({
                type: "error",
                msg: "You should login first"
            });
            navigate('/login');
        }
        const action = post.rating.down.stat.includes(UID) 
            ? 'down-cancel' : 'down';
        const {data: {updateRating: {success}}} = await updateRating({
            variables: {
                UID,
                PID,
                action,
            }
        })

        if (success) {
            refetch();
        }
        else {
            setStatus({
                type: "error",
                msg: "Unknown error occurred"
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
            handleEdit={handleEdit}
            handlePush={handlePush}
            handleDown={handleDown}
            hasPush={post.rating.push.stat.includes(UID)}
            hasDown={post.rating.down.stat.includes(UID)}
            isSelfPost={UID === post.UID}
        />
    )
}

export default Post;