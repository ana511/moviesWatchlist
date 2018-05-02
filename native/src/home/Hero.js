import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Hero extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View className="hero">
        <Text>Hero</Text>
      </View>
    );
  }
}

export default Hero;