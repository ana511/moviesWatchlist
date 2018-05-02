import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Movie from '../movie/Movie';
import Header from '../Header';

class NowPlaying extends Component{
  static navigationOptions = ({navigation}) => {
    return {
      header : <Header navigation={navigation}/>
    }
  };

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View className="nowPlaying">
        <Text>NowPlaying</Text>
      </View>
    );
  }
}

const NowPlayingStack = new StackNavigator({
  nowPlaying : { screen : NowPlaying },
  movie : { screen : Movie }
});

export default NowPlayingStack;