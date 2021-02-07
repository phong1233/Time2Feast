import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, ListItem, ListItemText, TextField, Button, ListItemIcon, Checkbox } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';


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
        width: '95%',
        minHeight: '90vh',
        backgroundColor: 'olive',
        display: 'flex',
        alignItems: 'center',
        '& > *': {
          margin: theme.spacing(2)
        },
        flexDirection: 'column',
        opacity: '0.97',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        padding: '4% 0'
    },

    content: {
        width: '100%',
        justify: 'center',
    },

    subcardcontent: {
        justify: 'center',
        height: '100%',
        // alignItems: 'center',
    },

    subcard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
    },

    list: {
        backgroundColor: '#4d4d4d',
    },

    button: {
        borderRadius: '0 0 1% 1%'
    }
}))

export default function RestaurantPage(props) {
    const classes = useStyles()
    const [invalid, setInvalid] = useState(false);
    const [itemName, setItemName] = useState(undefined);
    const [price, setPrice] = useState(undefined);
    const [nameList, setNameList] = useState([]);
    const [priceList, setPriceList] = useState([]);
    const [checked, setChecked] = useState([1]);

    const handleItemNameChange = (event) => {
        setItemName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleAdd = () => {
        if (!(itemName && price)) {
            setInvalid(true);
            return;
        }

        setInvalid(false);
        const newNameList = [...nameList];
        const newPriceList = [...priceList];
        newNameList.push(itemName);
        newPriceList.push(price);
        setNameList(newNameList);
        setPriceList(newPriceList);
    }

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    function renderRow(props) {
        const { style } = props;
        const index = nameList.length;
    
        return (
            <ListItem button style={style} key={index}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        // checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        // inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText primary={`${nameList[index]} - ${price[index]}$`} />
            </ListItem>
        );
    }
    
    renderRow.propTypes = {
        style: PropTypes.object.isRequired,
    };

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.title}>Restaurant Name</div>
                <CardContent className={classes.content}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Card className={classes.subcard}>
                                <div className={classes.subtitle}>My Menu</div>
                                <CardContent>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <div className={classes.list}>
                                                <FixedSizeList height={360} width={300} itemSize={60} itemCount={nameList.length} >
                                                    {renderRow}
                                                </FixedSizeList>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant='outlined'
                                            startIcon={<DeleteIcon />}
                                            fullWidth
                                            className={classes.button}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card className={classes.subcard}>
                                <div className={classes.subtitle}>Add Items</div>
                                <CardContent className={classes.subcardcontent}>
                                    <Grid 
                                        container spacing={0}
                                        style={{height: '100%'}}
                                        justify='space-evenly'
                                    >
                                        <Grid xs={12}>
                                            <TextField
                                                label='Item Name'
                                                variant='outlined'
                                                fullWidth
                                                size='small'
                                                onChange={handleItemNameChange}
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <TextField
                                                label='Price'
                                                variant='outlined'
                                                fullWidth
                                                size='small'
                                                onChange={handlePriceChange}
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <Button
                                                variant='outlined'
                                                startIcon={<CheckCircleOutlineIcon />}
                                                fullWidth
                                                color={invalid ? 'secondary' : 'default'}
                                                onClick={handleAdd}
                                            >
                                                Add
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}
