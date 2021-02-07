import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, CardMedia, CardActions, Grid, FormControl, TextField, Button, StyledButton } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
const base64 = require('base-64');

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80")',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
          margin: theme.spacing(2)
        }
    },

    card: {
        width: '60%',
        minHeight: '80vh',
        backgroundColor: 'lightslategrey',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
          margin: theme.spacing(2)
        },
        flexDirection: 'column',
        opacity: '0.97',
        borderRadius: '4%',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },

    textField: {
        margin: theme.spacing(2),
        width: '30vh'
    },

    icon: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },

    loginButton: {
        justifyContent: 'center',
        // background: '#e67219',
        // // boxShadow: '0 2px 5px 1px #2e2c2e',
        // // '&:hover': {
        // //     backgroundColor: 'lightslategrey',
        // //     boxShadow: 'none'
        // // }
    },

    signupButton: {
        '&:hover': {
            backgroundColor: 'lightslategrey',
            textDecoration: 'underline'
        }
    }
}))

export default function LoginPage(props) {
    const classes = useStyles();
    const [invalid, setInvalid] = useState(false);
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const login = () => {
        const url = 'http://localhost:5000/user/login';

        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + base64.encode(email + ":" + password));
        headers.append('Content-Type', 'application/json');
        fetch(url, {
            method: 'post',
            headers: headers
        })
        .then(response => response.json())
        .then(json => {
            if(json.status === 200) {
                localStorage.setItem('token', json.message);
                setInvalid(false);
                props.login();
            }
            else {
                setInvalid(true);
            }
        })
        .catch(() => {
            setInvalid(true);
        }
        );
    };

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.title}>
                    Sign in 2 feast
                </div>
                <CardContent className={classes.content}>
                    <Grid container spacing={2} alignItems="center" justify="center">
                        <Grid item>
                            <div className={classes.icon}>
                                <AccountCircleRoundedIcon fontSize='medium' />
                            </div>
                        </Grid>
                        <Grid item>
                            <FormControl required className={clsx(classes.textField)} variant="outlined" size="small">
                                <TextField
                                    required
                                    label='email'
                                    onChange={handleEmailChange}
                                    variant='outlined'
                                    size='small'
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" justify="center">
                        <Grid item>
                            <div className={classes.icon}>
                                <LockRoundedIcon fontSize='medium' />
                            </div>
                        </Grid>
                        <Grid item>
                            <FormControl required className={clsx(classes.textField)} variant="outlined" size="small">
                                <TextField
                                    required
                                    label='password'
                                    onChange={handlePasswordChange}
                                    variant='outlined'
                                    type='password'
                                    size='small'
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button 
                        className={classes.loginButton}
                        color={invalid ? 'secondary' : 'default'}
                        onClick={login}
                    >
                        sign in
                    </Button>
                </CardActions>
                <div spacing={2}>
                    New here?
                    <Button component={Link} to={'/signup'}className={classes.signupButton} size='medium' variant='text'>sign up</Button>
                </div>
            </Card>
        </div>
    );
}