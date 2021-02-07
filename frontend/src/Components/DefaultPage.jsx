import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import DefaultLogin from './DefaultLogin';
import OrderPage from './OrderPage/OrderPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


export default function DefaultPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [rname, setRname] = useState(undefined);

    const login = useCallback(() => {
        const url = 'http://localhost:5000/user/current';
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
                setIsOwner(json.message.role === 'owner')
                setRname(json.message.rname)
                setIsLoggedIn(true);
            }
            else {
                logout();
            }
        })
        .catch(() => {
            logout();
        });
      },
      []
    );

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      },
      []
    );

    useEffect(() => {
        if(localStorage.getItem('token')) {
            const url = 'http://localhost:5000/user/login';
    
            let headers = new Headers();
            headers.set('x-access-token', localStorage.getItem('token'));
            headers.append('Content-Type', 'application/json');
            fetch(url, {
                method: 'get',
                headers: headers
            })
            .then(response => response.json())
            .then(json => {
                if(json.status !== 200) {
                    logout();
                }
                else {
                    localStorage.setItem('token', json.message);
                    login();
                }
            })
            .catch(() => {
                logout();
            });
        }
    }, [login, logout]);


    if(!isLoggedIn) {
        return <DefaultLogin login={login}/>
    }
    return (
        <Router>
            <main>
                <Switch>
                    {isOwner && <Route path='/restaurant' exact component={() => <div>restp</div> } />}
                    <Route path='/' component={() => <OrderPage logout={logout} owner={isOwner} rname={rname}/>}/>
                </Switch>
            </main>
        </Router>
    );
}