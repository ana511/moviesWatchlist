import React, { Component } from 'react';
import './Dashboard.css';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile.js';
import Watchlist from './Watchlist.js';

class Dashboard extends Component{
  
  logout(){
    console.log("user signed out");
  }

  render(){
    let currentScreen = this.props.match.url;

    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <aside>
          <Link to={`${currentScreen}/profile`}>Profile</Link>
          <Link to={`${currentScreen}/watchlist`}>Watchlist</Link>
        </aside>
        <Switch>
          <Route exact path={`${currentScreen}/`} component={Watchlist} />
          <Route path={`${currentScreen}/profile`} component={Profile} />
          <Route path={`${currentScreen}/watchlist`} component={Watchlist} />
        </Switch>

        <button onClick={ () => this.logout() }>Sign out</button>
      </div>
    );
  }
}

export default Dashboard;