import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import { Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './hooks/useUser';

const useStyles = makeStyles(theme => {
    return {
        title: {
            width: '300px',
            marginLeft: '80px'
        },
        searchBar: {
            width: '300px',
            height: '40px',
            marginLeft: '20px',
            position: 'absolute',
            left: '620px'
        },
        homeButton: {
            marginLeft: '2px'
        },
        profileButton: {
            marginLeft: '25px'
        },
        navigation: {
            marginLeft: '-150px'
        },
        searchButton: {
            width: '50px',
            position: 'absolute',
            left: '940px'
        },
        registerButton: {
            width: '70px',
            position: 'absolute',
            left: '1070px'
        },
        loginButton: {
            width: '100px',
            position: 'absolute',
            left: '990px'
        }
    }
})

function Header(props) {
    const {UID, isLogin} = useUser();
    const { title } = props;
    const classes = useStyles();
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* <Button size="small">Subscribe</Button> */}
                
                <Grid className={classes.title}>
                    <Typography
                        variant="h4"
                        align="center"
                        noWrap
                    >
                        <Link color="primary" href="/posts" underline="none">{title}</Link>
                    </Typography>
                </Grid>

                <Grid className={classes.homeButton}>
                    <Link
                        color="inherit"
                        variant="body2"
                        href="/posts"
                    >
                        Home
                    </Link>
                </Grid>

                {isLogin && 
                    <>
                        <Grid className={classes.profileButton}>
                            <Link
                                color="inherit"
                                variant="body2"
                                href={`/profile/${UID}`}
                            >
                                Profile
                            </Link>
                        </Grid>
                        <Grid className={classes.profileButton}>
                            <Link
                                color="inherit"
                                variant="body2"
                                href={`/profile/${UID}`}
                            >
                                Followings
                            </Link>
                        </Grid>
                    </>
                }

                {!isLogin && 
                    <>
                        <Grid className={classes.profileButton}>
                            <Link
                                color="inherit"
                                variant="body2"
                                href={`/profile/${UID}`}
                            >
                                Sponsor
                            </Link>
                        </Grid>
                    </>
                }

                <Grid className={classes.searchBar}>             
                    <TextField size="small" sx={{ width: 300 }}>
                    </TextField>
                </Grid>  

                <Grid className={classes.searchButton}>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Grid>
                
                {!isLogin && 
                    <>
                        <Grid className={classes.loginButton}>
                            <Button variant="outlined" size="small" onClick={handleLogin}>
                                Login
                            </Button>
                        </Grid>

                        <Grid className={classes.registerButton}>
                            <Button variant="outlined" size="small" onClick={handleRegister}>
                                Register
                            </Button>
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