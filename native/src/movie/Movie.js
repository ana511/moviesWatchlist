import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import Header from '../Header';
import Tabs from './Tabs';
import Config from 'react-native-config';

class Movie extends Component{
   static navigationOptions = ({navigation}) => {
    return {
      drawerLabel: 'Movie',
      header : <Header navigation={navigation}/>
    }
  };

  constructor(props){
    super(props);

    this.state = {
      details : {},
      images : {},
      videos : {},
      credits : {}
    };
  }

  componentDidMount(){
    let tmdb_url = Config.TMDB_URL;
    let tmdb_api_key = Config.TMDB_API_KEY;
    let movie_id = this.props.navigation.state.params.movie;

    fetch(`${tmdb_url}movie/${movie_id}?api_key=${tmdb_api_key}&page=1&append_to_response=images,videos,credits`)
    .then((response) => response.json())
    .then((responseJson) => {
      const {images, videos, credits, ...details} = responseJson;

      this.setState({
        details : details, 
        images : images,
        videos : videos, 
        credits : credits
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  bookmark(){
    console.log("User wants to bookmark this movie");

    fetch('http://172.16.1.10:80/moviesWatchlist/server/handle_bookmarks.php', {
      method: 'POST',
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.props.navigation.state.params.movie),
    })
    .then((res) => res.text())
    .then((response) => console.log("Success:", response))
    .catch((error) => console.log("an error occurred", error));
  }

  render(){
    let movie = this.props.navigation.state.params.movie;

    return (
      <ScrollView style={movieStyle.container}>
        <Text>Movie</Text>
        <Text>{movie.title}</Text>
        <Button title="bookmark" onPress={() => this.bookmark() } />
        <Tabs details={this.state.details} videos={this.state.videos} credits={this.state.credits}/>
      </ScrollView>
    );
  }
}

const movieStyle = {
  container : {
    flex : 1
  }
};

export default Movie;