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
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/chat" component={Groupchat}/>
      </Switch>
    );
  }
}

const PrivateRoute= ({component: Component, ...rest}) => 
  
  <Route {...rest} render={
    (props)=>{
      return(
        props.location.state?
        <Component {...props}/>
        :(<Redirect to='/login'/>)
      ) 
    }
  }
  />

export default App;
