import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, View, Button } from 'react-native';

import SignIn from './SignIn';
import SignUp from './SignUp';

class Login extends Component{
  constructor(props){
    super(props);
  }

  gotoSignIn(){
    this.props.navigation.navigate("signin");
  }

  gotoSignUp(){
    this.props.navigation.navigate("signup");
  }

  render(){
    return (
      <View className="login">
        <Text>Login</Text>
        <Button title="Sign In" onPress={() => this.gotoSignIn() }/>
        <Button title="Register" onPress={() => this.gotoSignUp() }/>
      </View>
    );
  }
}

const AuthenticationStack = new StackNavigator({
  login : { screen : Login },
  signin : { screen : SignIn },
  signup : { screen : SignUp }
});

export default AuthenticationStack;