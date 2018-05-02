import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./List.css";

class List extends Component{

  renderListItems(){
    let img_url = process.env.REACT_APP_TMDB_IMAGE_URL;
    let currentScreen = this.props.match.url;

    return this.props.movies.map( (movie) => (
      <div key={movie.id}>
        <div><img src={`${img_url}w185${movie.poster_path}`} alt={movie.title}/></div>
        <div>
          <p>{movie.release_date}</p>
          <p className="overview">{movie.overview.substring(0, 285)} ...</p>
          <Link to={`${currentScreen}/:${movie.id}`}>read more</Link>
        </div>
      </div>
    ));
  }

  render(){
    return (
      <div className="list">
        {
          this.props.movies.length > 0 ? this.renderListItems() : (
            <div className="preloader"><img src={require('../img/loading_icon.gif')} alt="poster"/></div>
          )
        }
      </div>
    );
  }
}

export default List;