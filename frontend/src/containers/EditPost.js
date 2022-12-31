import { useQuery, useMutation } from "@apollo/client";
import { Button, Grid, Input, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_POST_MUTATION, POST_BY_PID_QUERY } from "../graphql";
import { useUser } from "./hooks/useUser";

const EditPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {UID, isLogin, setStatus} = useUser();

    const { id: PID } = useParams();
    const navigate = useNavigate();
    
    const [updatePost] = useMutation(UPDATE_POST_MUTATION);
    const { loading, data } = useQuery(POST_BY_PID_QUERY, {
        variables: {
            PID
        }
    })
    const { postByPID: post } = loading ? { postByPID: [] } : data;

    useEffect(() => {
        if (post !== []) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post])

    if (!isLogin || (!loading && UID !== post.UID)) {
        setStatus({
            type: 'error',
            msg: 'Permission denied'
        })
        return;        
    }

    const handleSubmit = async () => {
        const { data: { updatePost: {
            success,
            msg
        }}} = await updatePost({
            variables: {
                PID, title, content
            }
        });

        if (success) {
            setStatus({
                type: 'success',
                msg: 'Successfully updated',
            })
        }
        else {
            setStatus({
                type: 'error',
                msg: 'Update failed'
            })
        }
        navigate(`/post/${PID}`);
    }

    return (
        <>  
            <Grid                
                container 
                justifyContent="center"
                sx={{
                    width: "100%",
                }}>
                <div>
                    <h1>Edit your post</h1>
                </div>
            </Grid>

            <Grid 
                container 
                justifyContent="center"
                sx={{
                    width: "100%",
                }}
            >
                <Paper 
                    elevation={4} 
                    sx={{
                        width: "60%",
                        position: "relative",
                    }}
                >
                    <TextField 
                        name="title"
                        value={title}
                        placeholder="Title..."
                        onChange={(e)=>setTitle(e.target.value)}

                        multiline
                        rows={1}
                        sx={{
                            width: "100%",
                            fontSize: "100px"
                        }}
                    >
                    </TextField>
                    <TextField 
                        name="content"
                        value={content}
                        placeholder="Write your post..."
                        onChange={(e)=>setContent(e.target.value)}

                        multiline
                        rows={17}
                        sx={{width: "100%", height: "100%"}}
                    >
                    </TextField>
                </Paper>
            </Grid>

            <Grid 
                container 
                justifyContent="center"
                sx={{
                    width: "100%",
                }}
            >       
                <Grid 
                    container 
                    item 
                    justifyContent="flex-end"
                    sx={{
                        width: "60%",
                    }}
                >    
                    <Button 
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            position: "absolute",
                            bottom: "90px",
                            marginRight: "20px",
                            marginBottom: "10px"
                        }}
                    >
                        Update
                    </Button>
                </Grid> 
            </Grid>  
        </>
    )
}

export default EditPost;