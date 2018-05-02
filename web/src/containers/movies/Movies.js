import React, { Component } from 'react';
import './Movies.css';
import { Route, Switch } from 'react-router-dom';
import Upcoming from "./Upcoming.js";
import NowPlaying from "./NowPlaying";
import TopRated from "./TopRated";

class Movies extends Component{
  constructor(props){
    super(props);
    console.log("MOVIES PROPS", props);
  }

  render(){
    let currentScreen = this.props.match.url;
    let location = this.props.location.pathname.split("/");
    location = location[location.length - 1];

    return (
      <div className="movies">
        <div className="asideNav">
          <a href={`${currentScreen}/nowPlaying`} className={location === 'nowPlaying' ? 'active' : null}>Now Playing</a>
          <a href={`${currentScreen}/upcoming`} className={location === 'upcoming' ? 'active' : null}>Upcoming</a>
          <a href={`${currentScreen}/topRated`} className={location === 'topRated' ? 'active' : null}>Top Rated</a>
        </div>
        <div className="tabs">
          <Switch>
            <Route exact path={`${currentScreen}/`} component={NowPlaying} />
            <Route path={`${currentScreen}/upcoming`} component={Upcoming} />
            <Route path={`${currentScreen}/nowPlaying`} component={NowPlaying} />
            <Route path={`${currentScreen}/topRated`} component={TopRated} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Movies;