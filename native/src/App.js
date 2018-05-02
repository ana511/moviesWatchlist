import React, { Component } from 'react';
import { DrawerNavigator, SafeAreaView } from 'react-navigation';

import styles from './AppStyles.js';
import HomeStack from './home/Home';
import NowPlayingStack from './movies/NowPlaying';
import AuthenticationStack from './authentication/Login';
import SplashScreen from 'react-native-splash-screen';

const AppNav = new DrawerNavigator({
  home : { screen : HomeStack },
  nowPlaying : { screen : NowPlayingStack },
  login : { screen : AuthenticationStack }
},{
  initialRouteName : 'home'
});

class App extends Component{
  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return (
      <SafeAreaView style={{flex : 1}}>
        <AppNav />
      </SafeAreaView>
    );
  }
}

export default App;