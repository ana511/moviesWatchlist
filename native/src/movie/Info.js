import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Info extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={infoStyle.container}>
        <Text>Info</Text>
      </View>
    );
  }
}

const infoStyle = {
  container : {
    flex : 1
  }
};

export default Info;