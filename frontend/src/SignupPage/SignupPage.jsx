import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Grid, TextField, InputAdornment, Button, CardMedia } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

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
        // alignItems: 'center',
        // justifyContent: 'center',
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

    content: {
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row'
    },

    imageContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '27px'
    },

    media: {
        width: '100%',
        minHeight: '35vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
        backgroundSize: 'cover'
    },
}))

export default function SignupPage(props) {
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.title}>
                    Sign up
                </div>
                <div className={classes.subtitle}>
                    Fill out this form to create a Time2Feast account
                </div>
                <div className={classes.content}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    label='First Name'
                                    variant='outlined'
                                    fullWidth required
                                    size='small'
                                    // error={invalidBusinessName}
                                    // onChange={handleBusinessName}
                                    InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end' />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='Address'
                                    variant='outlined'
                                    fullWidth required
                                    size='small'
                                    // error={invalidBusinessName}
                                    // onChange={handleBusinessName}
                                    InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end' />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='Email'
                                    variant='outlined'
                                    fullWidth required
                                    size='small'
                                    // error={invalidBusinessName}
                                    // onChange={handleBusinessName}
                                    InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end' />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='Password'
                                    variant='outlined'
                                    fullWidth required
                                    size='small'
                                    // error={invalidBusinessName}
                                    // onChange={handleBusinessName}
                                    InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end' />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='Confirm Password'
                                    variant='outlined'
                                    fullWidth required
                                    size='small'
                                    // error={invalidBusinessName}
                                    // onChange={handleBusinessName}
                                    InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end' />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                // className={classes.button}
                                startIcon={<ExitToAppIcon />}
                                // component={Link}
                                // to={'/'}
                            >
                                Login
                            </Button>
                            </Grid>
                            <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                // className={allowedSubmit ? classes.button : classes.buttonError}
                                startIcon={<CheckCircleOutlineIcon />}
                                // onClick={verifySubmission}
                            >
                                Submit
                            </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    label='Last Name'
                                    variant='outlined'
                                    fullWidth required
                                    size='small'
                                    // error={invalidBusinessName}
                                    // onChange={handleBusinessName}
                                    InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end' />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label='City'
                                    variant='outlined'
                                    fullWidth required
                                    size='small'
                                    // error={invalidBusinessName}
                                    // onChange={handleBusinessName}
                                    InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end' />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label='Country'
                                    variant='outlined'
                                    fullWidth required
                                    size='small'
                                    // error={invalidBusinessName}
                                    // onChange={handleBusinessName}
                                    InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end' />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label='Postal Code'
                                    variant='outlined'
                                    fullWidth required
                                    size='small'
                                    // error={invalidBusinessName}
                                    // onChange={handleBusinessName}
                                    InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end' />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Card className={classes.media}>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}

// email, password, first name, last name, address, restaurant name (optional)