import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Upcoming extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View className="upcoming">
        <Text>Upcoming</Text>
      </View>
    );
  }
}

export default Upcoming;