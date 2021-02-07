import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, TextField, Button, CardMedia } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useHistory, Link } from 'react-router-dom';
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
        width: '80%',
        minHeight: '80vh',
        backgroundColor: 'burlywood',
        display: 'flex',
        '& > *': {
            margin: theme.spacing(2)
        },
        flexDirection: 'column',
        opacity: '0.97',
        borderRadius: '3%',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: '0 1%'
    },

    subtitle: {
        padding: '0 1%'
    },

    media: {
        width: '100%',
        minHeight: '35vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
        backgroundSize: 'cover'
    },

    button: {
        width: '100%'
    }
}))

export default function SignupPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const [invalid, setInvalid] = useState(false);
    const [fname, setFname] = useState(undefined);
    const [lname, setLname] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [confirmPassword, setConfirmPassword] = useState(undefined);
    const [rname, setRname] = useState(undefined);


    const handleFnameChange = (event) => {
        setFname(event.target.value);
    };

    const handleLnameChange = (event) => {
        setLname(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleRnameChange = (event) => {
        setRname(event.target.value);
    };

    const handleSubmit = () => {
        if (confirmPassword !== password) {
            setInvalid(true);
            return;
        }
        if (!(fname && lname && email && address && password && confirmPassword)) {
            setInvalid(true);
            return;
        }

        const payload = {
            fname: fname,
            lname: lname,
            address: address,
            rname: rname
        }
        const url = 'http://localhost:5000/user/create';
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + base64.encode(email + ":" + password));
        headers.append('Content-Type', 'application/json');
        fetch(url, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === 200) {
                    setInvalid(false);
                    history.push('/');
                }
                else {
                    setInvalid(true);
                }
            })
            .catch((e) => {
                setInvalid(true);
            });
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.title}>
                    Sign up
                </div>
                <div className={classes.subtitle}>
                    Fill out this form to create a Time2Feast account
                </div>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleFnameChange}
                                        label='First Name'
                                        variant='outlined'
                                        fullWidth required
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleAddressChange}
                                        label='Address'
                                        variant='outlined'
                                        fullWidth required
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleEmailChange}
                                        label='Email'
                                        variant='outlined'
                                        fullWidth required
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handlePasswordChange}
                                        label='Password'
                                        variant='outlined'
                                        type='password'
                                        fullWidth required
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleConfirmPasswordChange}
                                        label='Confirm Password'
                                        type='password'
                                        variant='outlined'
                                        fullWidth required
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <br />
                                </ Grid>
                                <Grid item xs={12}>
                                    <br />
                                </ Grid>
                                <Grid item xs={6}>
                                    <Button
                                        className={classes.button}
                                        variant='outlined'
                                        startIcon={<ExitToAppIcon />}
                                        component={Link}
                                        to={'/'}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        className={classes.button}
                                        variant='outlined'
                                        color={invalid ? 'secondary' : 'default'}
                                        startIcon={<CheckCircleOutlineIcon />}
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleLnameChange}
                                        label='Last Name'
                                        variant='outlined'
                                        fullWidth required
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleRnameChange}
                                        label='Restaurant Name'
                                        variant='outlined'
                                        fullWidth
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Card className={classes.media}>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}
