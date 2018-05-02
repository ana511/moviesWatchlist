import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Popular extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View className="popular">
        <Text>Popular</Text>
      </View>
    );
  }
}

export default Popular;