import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import List from '../../components/List.js';
import Movie from '../movie/Movie.js';

class Upcoming extends Component{
	constructor(props){
		super(props);

    this.state = {
      upcoming : []
    };
	}

  componentWillMount(){
    let tmdb_url = process.env.REACT_APP_TMDB_URL;
    let tmdb_api_key = process.env.REACT_APP_TMDB_API_KEY;

    fetch(`${tmdb_url}movie/upcoming?api_key=${tmdb_api_key}&page=1`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        upcoming : responseJson.results
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

	render(){
    let currentScreen = this.props.match.url;

		return (
      <div className="upcoming">
        <Switch>
          <Route path={`${currentScreen}/:movie`} component={Movie}/>
          <Route path={`${currentScreen}/`} render={ (props) => {
            return (
              <div>
                 <h1>Upcoming</h1>
                  { this.state.upcoming.length > 0 ? (
                    <List movies={this.state.upcoming} match={this.props.match}/>
                  ) : (
                    <div className="preloader"><img src={require('../../img/loading_icon.gif')} alt="poster"/></div>
                  ) }
              </div>
            );
          }}/>
        </Switch>
    </div>
    );
	}
}

export default Upcoming;