import React, { Component } from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  Image, 
  Dimensions,
  Button,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import Swiper from 'react-native-swiper';

import Movie from '../movie/Movie';
import Popular from '../movies/Popular';
import Header from '../Header';

const sWidth = Dimensions.get('window').width;

class Home extends Component{
  static navigationOptions = ({navigation}) => {
    return {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={20}
          style={{ color: tintColor }}
        />
      ),
      header : <Header navigation={navigation}/>
    }
  };

  constructor(props){
    super(props);

    this.state = {
      popular : []
    };
  }

  renderPopularItem(item){
    let img_url = Config.TMDB_IMAGE_URL;

    return (
      <View key={item.id}>
        <Image source={{uri : `${img_url}w185${item.poster_path}`}} style={homeStyles.poster}/>
        <Text>{item.title}</Text>
      </View>
    );
  }

  _keyExtractor(item){
    return item.id.toString();
  }

  gotoMovie(item){
    this.props.navigation.navigate("movie", { movie : item.id });
  }

  renderSlides(){
    let img_url = Config.TMDB_IMAGE_URL;

    return this.state.popular.map((item) => (
        <TouchableOpacity key={item.id} style={homeStyles.slide} onPress={ () => this.gotoMovie(item) }>
          <Image source={{uri : `${img_url}w500${item.poster_path}`}} style={{width : sWidth, height : 200}}/>
        </TouchableOpacity>
      )
    );
  }

  render(){
    return (
      <View className="home" style={homeStyles.container}>
        <Text>Home</Text>

        {
          this.state.popular && this.state.popular.length > 0 ? (
            <View style={{flex : 1}}>
              <Swiper 
                style={homeStyles.swiper}
                autoplay={true}
                showButtons={false}
                showsPagination={false}
                >
                { this.renderSlides() }
              </Swiper>

              <FlatList
                data={this.state.popular}
                renderItem={({item}) => this.renderPopularItem(item)}
                keyExtractor={(item, index) => this._keyExtractor(item)}
                horizontal
              />
            </View>
          ) : (
            <ActivityIndicator size="large" color="#ec4531"/>
          )
        }
      </View>
    );
  }

  componentDidMount(){
    let tmdb_url = Config.TMDB_URL;
    let tmdb_api_key = Config.TMDB_API_KEY;

    fetch(`${tmdb_url}movie/popular?api_key=${tmdb_api_key}&page=1`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        popular : responseJson.results
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

const homeStyles = {
  container : {
    backgroundColor : 'lightblue',
    flex : 1
  },
  poster : {
    width : 150,
    height : 200
  },
  swiper : {
    width : sWidth,
    height : 200
  },
  slide : {
    height : 200
  }
};

const HomeStack = new StackNavigator({
  home : { screen : Home },
  movie : { screen : Movie },
  popular : { screen : Popular }
});

export default HomeStack;