import React from 'react';
import {Route, Redirect, Switch, Router} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Groupchat from './components/Groupchat';
import chat from './lib/chat'

class App extends React.Component{
  constructor(props){
    super(props);
    chat.init();
  }
  render(){
    return(
      <Switch>
        <Redirect exact from="/" to="/login"/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/chat" component={Groupchat}/>
      </Switch>
    );
  }
}


export default App;
