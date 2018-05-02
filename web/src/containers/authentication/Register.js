import React, { Component } from 'react';
import { Input } from 'react-materialize';
import './Authentication.css';

class Register extends Component{
  constructor(props){
    super(props);

    this.state = {
      name : '',
      username : '',
      email : '',
      password : '',
      retypepassword : '',
      errorMsg : ''
    };
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
    if(!(/[\w+]/).test(this.state.name) || this.state.name.length < 2 ){
      errorMsg = "Invalid name";
    }

    if(this.state.username.length < 4 || (/\[([^\]]+)]/).test(this.state.username)){
      errorMsg = "Username needs to be at least 4 characters long and not contain special characters like < > [] ()";
    }

    if(!(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-]+/).test(this.state.email)){
      errorMsg = "Invalid email";
    }

    if(this.state.password !== this.state.retypepassword || (/\[([^\]]+)]/).test(this.state.password) || this.state.password.length < 4){
      errorMsg = "Passwords do not match or contain invalid characters";
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

  submitRegisterForm(){
    let valid = this.validate();

    if(valid){
      //submit form
      this.setState({errorMsg : ''});
      console.log("form is valid");
      console.log(this.state.errorMsg);
    }
    else{
      //ask users to fix errors
      console.log("form is invalid");
      console.log(this.state.errorMsg);
    }
  }

  render(){
    return (
      <div className="register">
        <h1>Register</h1>
        <form>
          <Input 
            name="name" 
            type="text" 
            placeholder="Write your name" 
            label="Name"
            onChange={ (event) => this.updateUserDetails(event) }
          />
          <Input 
            name="username" 
            type="text" 
            placeholder="Write your username" 
            label="Username"
            onChange={ (event) => this.updateUserDetails(event) }
          />
          <Input 
            name="email" 
            type="email" 
            placeholder="Write your email" 
            label="Email"
            onChange={ (event) => this.updateUserDetails(event) }
            required
          />
          <Input 
            name="password" 
            type="password" 
            placeholder="Choose a password" 
            label="Password"
            onChange={ (event) => this.updateUserDetails(event) }
            required
          />
          <Input 
          name="retypepassword" 
          type="password" 
          placeholder="Re-type your password here" 
          label="Re-Type Password"
          onChange={ (event) => this.updateUserDetails(event) }
          required
          />
        </form>
        <div className="button"><button onClick={ () => this.submitRegisterForm() } >Register</button></div>
      </div>
    );
  }
}

export default Register;

/*
  name
  username
  email
  password
  confirm password
*/