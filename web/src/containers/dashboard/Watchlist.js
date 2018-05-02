import React, { Component } from 'react';
import List from '../../components/List.js';

class Watchlist extends Component{
  constructor(props){
    super(props);

    this.state = {
      watchlist : []
    };
  }

  componentWillMount(){
    let tmdb_url = process.env.REACT_APP_TMDB_URL;
    let tmdb_api_key = process.env.REACT_APP_TMDB_API_KEY;
    let currentScreen = this.props.match.url;

    fetch(`${tmdb_url}movie/now_playing?api_key=${tmdb_api_key}&page=1`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          watchlist : responseJson.results
        });
        this.getReview();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render(){
    return (
      <div className="Watchlist">
        <h1>Watchlist</h1>
        <List movies={this.state.watchlist} match={this.props.match.url}/>
      </div>
    );
  }
}

export default Watchlist;