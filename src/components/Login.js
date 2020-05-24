import React, {useState} from 'react';
import Popup from './Popup';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state= {name: '',e_id: ''};
        this.changeValue=this.changeValue.bind(this);
        this.showValue=this.showValue.bind(this);
    }

    changeValue(e){
        this.setState({[e.target.name]: e.target.value});
    }

    showValue(e){
        console.log("Though shall not name " + this.state.name);
        console.log("Email as entered: " + this.state.e_id );
        e.preventDefault();
        e.target.reset();
    }
    render(){
        return(
            <div className="App">
                <h2>Chat Room Login</h2>
                <form onSubmit={this.showValue}>
                    <div className="form-group">
                        <label>
                        Name:
                        <input type="text" className="form-control" value={this.state.name} name="name" onChange={this.changeValue}/>
                        </label>
                    </div>    

                    <input type="submit" value="Submit" className="btn btn-primary" />
                </form>
            </div>
        );
    }
}


export default Login;
