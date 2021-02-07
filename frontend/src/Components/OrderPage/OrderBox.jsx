import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Backdrop from '@material-ui/core/Backdrop';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    box: {
        width: 300,
        height: 300,
        position: 'relative',
        overflow: 'scroll'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    menuContainer: {
        width: '40%',
        minHeight: '30vh',
        backgroundColor: 'lightslategrey',
        '& > *': {
          margin: theme.spacing(2)
        },
        opacity: '0.97',
        borderRadius: '4%',
    },
    button: {
        width: '100%'
    }
}));

export default function OrderBox(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [currentSelection, setCurrentSelection] = useState('');
    const [disabled, setDisabled] = useState(props.orderCount >= props.max)

    const handleCancel = () => {
        setCurrentOrder([]);
        setOpen(false);
    }

    const handleValueChange = (e) => {
        setCurrentSelection(e.target.value)
    }

    const handleAddItem = () => {
        if(! currentSelection || currentSelection === '') {
            return;
        }
        let found = false;
        let temp = currentOrder;
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].name === currentSelection) {
                found = true;
                temp[i].quantity += 1;
            }
        }
        if(!found) {
            temp.push({
                'name': currentSelection,
                'quantity': 1,
                'price': 10
            });
        }
    }

    const handleOrder = () => {
        const url = 'http://localhost:5000/order/new';

        let headers = new Headers();
        headers.set('x-access-token', localStorage.getItem('token'));
        headers.append('Content-Type', 'application/json');
        fetch(url, {
            method: 'post',
            headers: headers,
            body: JSON.stringify({
                'rname': props.rname,
                'end': props.end,
                'items': currentOrder
            })
        })
        .then(response => response.json())
        .then(json => {
            setCurrentOrder([]);
            setOpen(false);
            props.reload();
        })
        .catch(() => {
            setCurrentOrder([]);
            setOpen(false);
        });

    }

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleExpandClick = () => {
            setExpanded(!expanded);
    };


    useEffect(() => {
        const url = `http://localhost:5000/resto/${props.rname}`;
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
                setMenu(json.message);
            }
            else {
                setMenu([]);
            }
        })
        .catch(() => {
            setMenu([]);
        });
    }, [props]);


    const handleDone = () => {
        const url = `http://localhost:5000/order/`;
        let headers = new Headers();
        headers.set('x-access-token', localStorage.getItem('token'));
        headers.append('Content-Type', 'application/json');
        fetch(url, {
            method: 'delete',
            headers: headers,
            body: JSON.stringify({
                'end': props.end
            })
        })
        .then(response => response.json())
        .then(json => {
            props.reload();
        })
        .catch(() => {
            props.reload();
        });
    }

  return (
    <Card className={classes.box}>
        <CardHeader
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
            title={props.rname}
            subheader={`Deliver at: ${props.end}, For: ${props.shipping}$, Currnt: ${props.orderCount}/${props.max}`}
        />
        <CardActions disableSpacing>
            {props.owner ? 
                <Button
                    variant='outlined'
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={handleDone}
                >
                    Done
                </Button>
            :
                <Button
                variant='outlined'
                startIcon={<CheckCircleOutlineIcon />}
                onClick={handleToggle}
                disabled={disabled}
                >
                    Order
                </Button>
            }
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label='show more'
            >
                <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <List>
                {
                    props.orders.map((order) => {
                        return(
                            <ListItem key={order.customer}>
                                <ListItemText primary={order.customer} />
                            </ListItem>
                        );
                    })
                }
                </List>
            </CardContent>
      </Collapse>
      <Backdrop className={classes.backdrop} open={open}>
            <Card className={classes.menuContainer}>
                <CardHeader
                    title='Menu'
                />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Select
                                variant='outlined'
                                onChange={handleValueChange}
                                className={classes.button}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    menu.map((item) => {
                                        return (
                                            <MenuItem value={item.name}>
                                                {`${item.name} - ${item.price}$`}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined' onClick={handleAddItem} className={classes.button}>
                            Add
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Current Items
                            </Typography>
                            <List>
                            {
                                currentOrder.map((order) => {
                                    return(
                                        <ListItem key={order.name}>
                                            <ListItemText primary={`${order.name} - x${order.quantity}`} />
                                        </ListItem>
                                    );
                                })
                            }
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant='outlined' onClick={handleOrder} className={classes.button}>
                            Order
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant='outlined' color='secondary' onClick={handleCancel} className={classes.button}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
      </Backdrop>
    </Card>
  );
}