import React from 'react';
import chat from './lib/chat'
import {withRouter} from 'react-router-dom'; 
class NavComponent extends React.Component {
  
  logOut = () =>{
    chat.logout().then(
      () =>{
        this.props.history.push("/login");
      },
      error =>{
        this.props.history.push("/login");
      }
    )
  }
  
  render() {

    return (
      <div>
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <div class="navbar-brand">ChatterBox</div>
            </div>
            <div class="navbar-form navbar-left" >
              <button type="submit" class="btn btn-primary" onClick = {this.logOut} >Logout</button>
            </div>
          </div>
        </nav>
      </div>

    )
  }
}

export default withRouter(NavComponent)
