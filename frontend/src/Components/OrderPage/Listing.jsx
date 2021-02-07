
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';

import OrderBox from './OrderBox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    width: '100%',
    padding: '40px 40px 80px 40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function Listing(props) {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);

    const reload = () => {
        const url = `http://localhost:5000/order/${props.rname}`;
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
                setOrders(json.message);
            }
            else {
                setOrders([]);
            }

        })
        .catch(() => {
            setOrders([]);
        });
    }

    useEffect(() => {
        const url = `http://localhost:5000/order/${props.rname}`;
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
                setOrders(json.message);
            }
            else {
                setOrders([]);
            }

        })
        .catch(() => {
            setOrders([]);
        });
    }, []);

    return(
        <div className={classes.container}>
        <Grid
            container
            direction='row'
            justify='center'
            alignItems='flex-start'
            spacing={8}
        >
            {
            orders.map((order) => {
                return(
                <Grid item key={order.id}>
                    <OrderBox 
                        max={order.maxOrder}
                        end={order.end}
                        shipping={order.shipping}
                        rname={order.rname}
                        orders={order.orders}
                        orderCount={order.orders.length}
                        owner={props.owner}
                        reload={reload}
                    />
                </Grid>
                );
            })
            }
        </Grid>
        </div>
    );
}