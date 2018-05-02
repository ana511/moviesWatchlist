import React, { Component } from 'react';
import { Icon } from 'react-materialize';
import "./Movie.css";

class Movie extends Component{
  constructor(props){
    super(props);

    this.state = {
      movieDetails : {},
      bookmarked : false
    };
  }

  componentWillMount(){
    let tmdb_url = process.env.REACT_APP_TMDB_URL;
    let tmdb_api_key = process.env.REACT_APP_TMDB_API_KEY;
    let movie_id = this.props.match.params.movie;

    movie_id = movie_id.split(":")[1];
    console.log(movie_id);

    fetch(`${tmdb_url}movie/${movie_id}?api_key=${tmdb_api_key}&page=1`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        movieDetails : responseJson
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  toggleBookmark(e){
    e.preventDefault();
    
    this.setState({
      bookmarked : !this.state.bookmarked
    });
  }

  render(){
    let movie = this.state.movieDetails;
    let img_url = process.env.REACT_APP_TMDB_IMAGE_URL;
    return (
      <div className="movie">
        <h1>Movie</h1>
        <div className="movieDetails">
          <div><img src={`${img_url}w780${movie.backdrop_path}`} alt={movie.title}/></div>
          <div>
            <p>{movie.release_date}</p>
            <p className="overview">{movie.overview}</p>
          </div>
        </div>
        <a href="#bookmark" onClick={ (e) => this.toggleBookmark(e)}>
          <Icon medium >
          { this.state.bookmarked ? 'favorite' : 'favorite_border' }
          </Icon>
        </a>
      </div>
    );
  }
}

export default Movie;