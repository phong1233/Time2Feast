import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Listing from './Listing';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80")',
        backgroundSize: 'cover',
        overflow: 'hidden',
        display: 'flex',
        '& > *': {
            margin: theme.spacing(2)
        }
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        opacity: 0.80,
    },

    drawerPaper: {
        width: drawerWidth,
    },

    titleContainer: {
        backgroundColor: 'lightslategrey',
        paddingTop: '15px',
        paddingBottom: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        opacity: '0.97',
        borderRadius: '20px',
        width: '280px'
    }
}))

export default function LoginPage(props) {
    const classes = useStyles();
    const [rname, setRname] = useState('le chau')
    const [allResto, setAllResto] = useState([])

    useEffect(() => {
        if(props.owner) {
            setAllResto([props.rname]);
            return;
        }

        const url = 'http://localhost:5000/resto/list';

        let headers = new Headers();
        headers.set('x-access-token', localStorage.getItem('token'));
        headers.append('Content-Type', 'application/json');
        fetch(url, {
            method: 'get',
            headers: headers
        })
        .then(response => response.json())
        .then(json => {
            if(json.status === 200) {
                let temp = json.message.map((e) => e['rname'])
                setAllResto(temp)
            }
            else {
                setAllResto([])

            }
        })
        .catch(() => {
            setAllResto([])
        });
    }, [props]);

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText primary={'Time 2 Feast'} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <TextField
                            className={classes.searchBar}
                            label='Search'
                            variant='outlined'
                            color='primary'
                            disabled={props.owner}
                        // onChange={handleSearch}
                        />
                    </ListItem>
                </List>
                {!props.owner &&
                    <List>
                        {allResto.map((text, index) => (
                            <ListItem button key={text} onClick={() => {setRname(text)}}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                }
                <Divider />
                <List>
                    <ListItem button onClick={props.logout}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItem>
                </List>
            </Drawer>
            <main>
                <div className={classes.titleContainer}>
                    <Typography className={classes.title} variant='h3'>
                        Order Page
                    </Typography>
                </div>
                <Listing rname={rname} owner={props.owner}/>
            </main>
        </div>
    );
}