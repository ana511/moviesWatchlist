import React, { Component } from 'react';
import { Input } from 'react-materialize';
import './Authentication.css';

class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      username : '',
      password : '',
      errorMsg : ''
    };

    if (typeof(Storage) !== "undefined") {
      console.log("Code for localStorage/sessionStorage.");
    } else {
      console.log("Sorry! No Web Storage support..");
    }
  }

  updateUserDetails(event){
    let inputFieldValue = event.currentTarget.value;
    let inputFieldName = event.currentTarget.name;

    let stateClone = JSON.parse(JSON.stringify(this.state));
    stateClone[inputFieldName] = inputFieldValue;

    this.setState(stateClone);
  }

  validate(){
    let errorMsg = '';

    // TODO
    if(this.state.username.length < 4 || (/\[([^\]]+)]/).test(this.state.username)){
      errorMsg = "Username needs to be at least 4 characters long and not contain special characters like < > [] ()";
    }

    if((/\[([^\]]+)]/).test(this.state.password) || this.state.password.length < 4){
      errorMsg = "Invalid password";
    }

    if(errorMsg !== ''){
      this.setState({
        errorMsg : errorMsg
      });
    }
    else{
      this.setState({
        errorMsg : ''
      });
    }

    return errorMsg !== '' ? false : true;
  }

  submitLoginForm(){
    let valid = this.validate();

    if(valid){
      //submit form
      this.setState({errorMsg : ''});
      
      let user = {
        username : this.state.username, 
        password : this.state.password
      };

      fetch('http://movieswatchlist.000webhostapp.com/server/handle_signin.php', {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        mode : 'no-cors',
        body: JSON.stringify(user),
      })
      .then((res) => res.text())
      .then((response) => {
        if(response === 'invalid'){
          alert("invalid data provided - please correct the form");
        }
        else if(response === 'could not find'){
          alert("an account matching the provided email and password could not be found");
        }
        else{
          alert("success");
          //save logged in variable in async storage
        }
      })
      .catch((error) => console.log("an error occurred", error));
      // this.props.history.push("/dashboard");
    }
    else{
      //ask users to fix errors
      console.log("form is invalid");
      console.log(this.state.errorMsg);
    }
  }

  render(){
    return (
      <div className="login">
        <h1>Login</h1>
        <form>
          <Input 
            name="username" 
            type="text" 
            placeholder="Write your username" 
            label="Username"
            onChange={ (event) => this.updateUserDetails(event) }
          />
          <Input 
            name="password" 
            type="password" 
            placeholder="Choose a password" 
            label="Password"
            onChange={ (event) => this.updateUserDetails(event) }
            required
          />
        </form>
        <div className="button"><button onClick={ () => this.submitLoginForm() }>Login</button></div>
      </div>
    );
  }
}

export default Login;

/*
  username
  password
*/