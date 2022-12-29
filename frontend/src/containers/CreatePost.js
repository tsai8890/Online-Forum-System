import { useMutation } from "@apollo/client";
import { Button, Grid, Input, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_POST_MUTATION } from "../graphql";
import { useUser } from "./hooks/useUser";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {UID, isLogin} = useUser();

    const navigate = useNavigate();
    
    const [createPost] = useMutation(CREATE_POST_MUTATION);

    if (!isLogin) {
        return (
            <>
                <h1>Log in to post!!</h1>
            </>
        )
    }

    const handleSubmit = async () => {
        const response = await createPost({
            variables: {
                UID, title, content
            }
        });

        const data = response.data.createPost;
        navigate(`/post/${data.PID}`);
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
                    <h1>Write your post</h1>
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
                        Post
                    </Button>
                </Grid> 
            </Grid>  
        </>
    )
}

export default CreatePost;