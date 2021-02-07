import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';


export default function DefaultLogin(props) {

    return(
        <Router>
            <main>
                <Switch>
                    <Route path='/signup' exact component={SignupPage}/>
                    <Route path='/' component={() => <LoginPage login={props.login} />}/>
                </Switch>
            </main>
        </Router>
    );
}