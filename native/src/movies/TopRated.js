import React, { Component } from 'react';
import { Text, View } from 'react-native';

class TopRated extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View className="topRated">
        <Text>TopRated</Text>
      </View>
    );
  }
}

export default TopRated;