import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Header extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View className="header">
        <Text>MoviesWatchlist</Text>
      </View>
    );
  }
}

export default Header;