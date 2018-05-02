import React, { Component } from 'react';
import { Text, View, TextInput, Button, ToastAndroid, AsyncStorage } from 'react-native';

class SignIn extends Component{
  constructor(props){
    super(props);

    this.state = {
      username : '',
      password : ''
    };
  }

  componentDidMount(){
    //check in AsyncStorage if there's item called "loggedin"

    //if it does
    // this.props.navigation.navigate("dashboard");
  }

  updateUserInfo(field, value){
    let stateClone = this.state;
    stateClone[field] = value;

    this.setState(stateClone);
  }

  validate(){
    // TODO
    return true;
  }

  signIn(){
    let valid = this.validate();

    if(valid){
      fetch('http://172.16.1.10:80/moviesWatchlist/server/handle_signin.php', {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
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
    }
    else{
      alert("you must correct the form before proceeding");
    }
  }

  render(){
    return (
      <View className="signIn">
        <Text>SignIn</Text>
        <View>
          <Text>Username:</Text>
          <TextInput 
            onChangeText={(value) => this.updateUserInfo("username", value) }
            value={this.state.username}
          />

          <Text>Password</Text>
          <TextInput 
            onChangeText={(value) => this.updateUserInfo("password", value) }
            value={this.state.password}
          />
        </View>
        <Button title="sign in" onPress={() => this.signIn()} />
      </View>
    );
  }
}

export default SignIn;