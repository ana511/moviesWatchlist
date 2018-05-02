import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Info from './Info';
import Cast from './Cast';
import Trailers from './Trailers';

const TabsNavigator = new TabNavigator({
  info : { screen : Info }, 
  cast : { screen : Cast },
  trailers : { screen : Trailers }
}, {
  tabBarOptions : {
    activeTintColor : '#ffffff',
    inactiveTintColor : '#c2c2c2',
    style : {
      backgroundColor : '#131313'
    },
    indicatorStyle : {
      backgroundColor : '#ec4531'
    }
  },
  tabBarPosition: 'top'
});

class Tabs extends Component{
  constructor(props){
    super(props);

    this.state = {
      height : 500
    };
  }

  render(){
    let height = this.state.height;

    return (
      <View style={{flex : 1, height : height}}>
        <TabsNavigator 
          screenProps={this.props}
          onNavigationStateChange={(prevState, currentState) => {
            if(currentState.index === 2) this.setState({height : this.props.videos.results.length * 200 });
          }}
        />
      </View>
    );
  }
}

export default Tabs;