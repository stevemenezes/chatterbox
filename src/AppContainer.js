import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Groupchat from './components/Groupchat';
import NavComponent from './NavComponent';

class AppContainer extends React.Component{

    render(){
        return(
        <div>
        <NavComponent />
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component = {Login} />
          <Route exact path="/chat" component={Groupchat} />
        </Switch>
        </div>   
        )}
}

export default AppContainer; 