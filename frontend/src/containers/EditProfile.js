import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useUser } from './hooks/useUser';
import { UPDATE_USER_MUTATION, USER_BY_UID_QUERY } from '../graphql';
import { useQuery, useMutation } from '@apollo/client'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const {UID, setStatus, isLogin} = useUser();
    const {loading, data: userData} = useQuery(USER_BY_UID_QUERY, {
        variables: {
            UID
        }
    });
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);

    const {userByUID: user} = loading ? {userByUID: []} : userData;
    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');

    const navigate = useNavigate();

    if (!isLogin) {
        navigate('/login');
    }

    const handleSubmit = async () => {
        const {data: {updateUser: {success, msg}}} = await updateUser({
            variables: {
                UID,
                nickname,
                intro,
            }
        });
        if (success) {
            setStatus({
                type: 'success',
                msg: 'Successfully updated',
            });
            navigate(`/profile/${UID}`)
        }
        else {
            setStatus({
                type: 'error',
                msg: 'Something went wrong'
            });
        }
    }

    useEffect(() => {
        if (!loading) {
            setNickname(user.nickname);
            if (user.intro)
                setIntro(user.intro);
        }
    }, [loading]);

    return (
        loading ? null :
        <Grid container justifyContent='center' sx={{marginTop: "10px"}}>
            <Grid item xs={7}>
                <Card variant='outlined'>
                    <CardContent>
                        <Grid container spacing={3} justifyContent='center'>
                            <Grid item xs={12}>
                                <Typography variant="h4" color='text.secondary'>
                                    Edit Profile
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    disabled
                                    id="username"
                                    name="username"
                                    label="Username"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={user.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="nickname"
                                    name="nickname"
                                    label="Nickname"
                                    fullWidth
                                    autoComplete="nickname"
                                    variant="standard"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="selfIntro"
                                    name="selfIntro"
                                    label="Introduce yourself"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    multiline
                                    value={intro}
                                    onChange={(e) => setIntro(e.target.value)}
                                />
                            </Grid>
                            <Grid item> 
                                <Button variant='outlined' onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default EditProfile;