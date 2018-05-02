import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Image, Linking } from 'react-native';
import Config from 'react-native-config';

class Trailers extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading : true, 
      trailers : []
    };
  }

  componentDidMount(){
    const youtube_api_key = Config.YOUTUBE_API_KEY;

    this.props.screenProps.videos.results.map((trailer) => {
      fetch(`${Config.YOUTUBE_URL}/?id=${trailer.key}&key=${Config.YOUTUBE_API_KEY}&part=snippet`)
      .then((response) => response.json())
      .then((responseJson) => {

        let trailers = this.state.trailers;
        trailers.push(responseJson);
        
        this.setState({
          trailers : trailers
        });

      })
      .catch((err) => console.log(err));
    });
  }

  _openYoutubeURL(url){
    Linking.canOpenURL(url)
    .then(supported => {
      if(!supported) console.log("can't handle URL");
      else return Linking.openURL(url);
    })
    .catch((err) => console.log("An error occurred: " , err));
  }

  _renderItems(){
    return this.state.trailers.map((trailer) => (
      <TouchableOpacity key={trailer.items[0].id} onPress={() => this._openYoutubeURL(`http://youtube.com/watch?v=${trailer.items[0].id}`)}>
        {
          trailer.items && trailer.items.length > 0 ? (
            <View>
              <Image source={{uri : `${trailer.items[0].snippet.thumbnails.medium.url}`}} style={{width : 120, height : 100}}/>
              <Text>{trailer.items[0].snippet.title}</Text>
            </View>
          ) : null
        }
      </TouchableOpacity>
    ));
  }

  render(){
    return (
      <View style={trailersStyle.container}>
        {
          this.state.trailers.length > 0 ? 
            this._renderItems() : (
            <ActivityIndicator size="small" color="#ec4531"/>
          )
        }
      </View>
    );
  }
}

const trailersStyle = {
  container : {
    flex : 1
  }
};

export default Trailers;