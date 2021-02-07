import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import DefaultLogin from './DefaultLogin';

export default function DefaultPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback(() => {
        setIsLoggedIn(true);
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
            login()
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
                    localStorage.setItem('token', json.responseMessage);
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
    return (<button onClick={logout}>logout</button>);
}