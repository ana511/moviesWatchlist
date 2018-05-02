import React, { Component } from 'react';
import { Icon } from 'react-materialize';
import "./Movie.css";

class Movie extends Component{
  constructor(props){
    super(props);

    this.state = {
      movie : {},
      bookmarked : false
    };
  }

  componentWillMount(){
    let tmdb_url = process.env.REACT_APP_TMDB_URL;
    let tmdb_api_key = process.env.REACT_APP_TMDB_API_KEY;

    let movie_id = this.props.match.params.movie.split(":")[1];

    fetch(`${tmdb_url}movie/${movie_id}?api_key=${tmdb_api_key}&page=1`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        movie : responseJson
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
    let movie = this.state.movie;
    let img_url = process.env.REACT_APP_TMDB_IMAGE_URL;

    return (
      <div className="movie">
        <h1>Movie</h1>
        
        {
          movie ? (
            <div key={movie.id} className="movieDetails">
              {
                movie.backdrop_path ? (
                  <div><img src={`${img_url}w780${movie.backdrop_path}`} alt={movie.title}/></div>
                ) : null
              }
              <div>
                <p>{movie.release_date}</p>
                <p className="overview">{ movie.overview }</p>
              </div>
            </div>
          ) : null
        }

        <a href="#" onClick={ (e) => this.toggleBookmark(e) }>
          <Icon medium>
            { this.state.bookmarked ? 'favorite' : 'favorite_border' }
          </Icon>
        </a>
      </div>
    );
  }
}

export default Movie;