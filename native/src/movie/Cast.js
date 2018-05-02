import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Cast extends Component{
  constructor(props){
    super(props);
  }

  renderCast(){
    return this.props.screenProps.credits.cast.map((castMember) => (
      <View>
        <Text>{castMember.name}</Text>
      </View>
    ));
  }

  render(){
    return (
      <View style={castStyles.container}>
        <Text>Cast</Text>
        {
          this.renderCast()
        }
      </View>
    );
  }
}

const castStyles = {
  container : {
    flex : 1
  }
};

export default Cast;