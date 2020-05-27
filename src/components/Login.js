import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import chat from '../lib/chat';
import spinner from '../logo.svg';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            name: '',
            isAuth: false,
            isSubmitting: false,
            user:null,
            errorText: '',
        };
    }

    changeValue=(e)=>{
        this.setState({[e.target.name]: e.target.value});
    }

    showValue=(e)=>{
        e.preventDefault();
        this.login();
        e.target.reset();
    }

    toggleIsSubmitting = () => {
        this.setState({isSubmitting: !this.state.isSubmitting});
    };


    login=()=>{
        this.toggleIsSubmitting();
        chat.login(this.state.name)
        .then(user=>{
            this.setState({user, isAuth: true})
            })
        .catch(error=>{
        this.setState({errorText: "Username Invalid"})
        this.toggleIsSubmitting();
        });
    }



    render(){
        
        if (this.state.isAuth===true){
            return(
                <Redirect to={{
                    pathname: '/chat',
                    state: {user: this.state.user}
                }}
                />
            );
        }

        return(
            <div className="App">
                <h2>Chat Room Login</h2>
                <form onSubmit={this.showValue} >
                    <div className="form-group">
                        <label>
                        Name:
                        <input type="text" className="form-control" value={this.state.name} name="name" onChange={this.changeValue}/>
                        </label>
                    </div>    
                    {this.state.isSubmitting ? 
                    (<img src={spinner} alt="Spinner component" className="App-logo" />):
                    (<input type="submit" disabled={this.state.name === ""} value="Submit" className="btn btn-primary" />
                    )}
                </form>
            </div>
        );
    }
}


export default Login;
