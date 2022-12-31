import * as React from 'react';
import { useState } from "react";
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import { Avatar, Divider, Grid, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import { createRef } from 'react';

const useStyles = makeStyles(theme => {
    return {
        title: {
            width: '300px',
            marginLeft: '100px'
        },
        searchBar: {
            width: '460px',
            height: '40px',
            marginLeft: '20px',
            position: 'absolute',
            left: '410px'
        },
        navigation: {
            marginLeft: '-150px'
        },
        searchButton: {
            width: '50px',
            position: 'absolute',
            left: '895px'
        },
        registerButton: {
            width: '70px',
            position: 'absolute',
            left: '1060px'
        },
        loginButton: {
            width: '100px',
            position: 'absolute',
            left: '980px'
        },
        signOutButton: {
            width: '120px',
            position: 'absolute',
        }
    }
})

function Header(props) {
    const {
        isLogin, UID, username, nickname,
        setIsLogin, setUID, setUsername, setNickname, setStatus
    } = useUser();

    const { title } = props;
    const classes = useStyles();
    const navigate = useNavigate();

    const [searchVal, setSearchVal] = useState('');
    const searchButtonRef = createRef();

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        setIsLogin(false);
        setUID("");
        setUsername("");
        setNickname("");

        setStatus({
            msg: "Successfully log out",
            type: "success"
        });
        navigate('/posts');
    }

    return (
        <>
            <Toolbar 
                sx={{ 
                    borderBottom: 1, 
                    borderColor: 'divider',
                }}
            >
                <Grid className={classes.title}>
                    <Typography
                        variant="h4"
                        align="center"
                        noWrap
                    >
                        <Link 
                            color="primary"
                            underline="none"
                            sx={{cursor: 'pointer'}}
                            onClick={()=>navigate(`/posts`)}
                        >
                            {title}
                        </Link>
                    </Typography>
                </Grid>

                <Grid className={classes.searchBar}>             
                    <TextField 
                        size="small" 
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        sx={{ width: 460 }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter')
                                searchButtonRef.current.click();
                        }}
                    >
                    </TextField>
                </Grid>  

                <Grid className={classes.searchButton}>
                    <IconButton onClick={() => navigate({
                        pathname: '/search',
                        search: `?q=${searchVal}`
                    })}
                        ref={searchButtonRef}
                    >
                        <SearchIcon />
                    </IconButton>
                </Grid>
                
                {!isLogin && 
                    <>
                        <Grid className={classes.loginButton}>
                            <Button 
                                variant="contained"
                                color="info"
                                size="small" 
                                sx={{
                                    height: "35px"
                                }}
                                onClick={handleLogin}
                            >
                                Log in
                            </Button>
                        </Grid>

                        <Grid className={classes.registerButton}>
                            <Button 
                                variant="contained" 
                                size="small" 
                                onClick={handleRegister}
                                sx={{
                                    height: "35px",
                                    width: "80px"
                                }}
                            >
                                Sign up
                            </Button>
                        </Grid>
                    </>
                }

                {isLogin && 
                    <>
                        <Grid 
                            container
                            justifyContent="center"
                            alignContent="center"
                            sx={{
                                position: "absolute",
                                left: "1000px",
                                width: "60px",
                                height: "60px",
                            }}
                        >

                            <Stack 
                                direction="row" 
                                spacing={3}
                                alignItems="center"
                                divider={<Divider orientation="vertical" flexItem />}
                                sx={{
                                    marginLeft: "150px",
                                }}
                            >
                                <Button 
                                    onClick={()=>navigate(`/profile/${UID}`)}
                                    sx={{textTransform:"none"}}
                                >
                                    <Stack
                                        direction="row" 
                                        alignItems="center"
                                        spacing={1.3}
                                    >
                                        <Avatar
                                            color="success"
                                            variant="circular"
                                            sx={{
                                                width: "43px",
                                                height: "43px",
                                            }}
                                        >
                                            {username.charAt(0).toUpperCase()}
                                        </Avatar>
                                            
                                        <Stack>
                                            <Typography
                                                sx={{color: "#292929", fontSize: "18px"}}    
                                            >
                                                {nickname.toLowerCase()}
                                            </Typography>
                                            <Typography
                                                sx={{color: "gray", fontSize: "13px"}}    
                                            >
                                                {`@${username.toLowerCase()}`}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Button>

                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    onClick={handleLogout}
                                    sx={{width: "88px", height: "40px",}}
                                >
                                    Sign out
                                </Button>
                            </Stack>
                        </Grid>
                    </>
                }
            </Toolbar>
        </>
    );
}

Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;