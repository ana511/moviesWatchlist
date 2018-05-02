import React, { Component } from 'react';
import { Carousel } from 'react-materialize';
import './Home.css';

const tmdb_url = process.env.REACT_APP_TMDB_URL;
const tmdb_api_key = process.env.REACT_APP_TMDB_API_KEY;
const img_url = process.env.REACT_APP_TMDB_IMAGE_URL;

class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      nowPlaying : [],
      reviews : [],
      isLoading : true,
      tv : []
    };
  }

  //will run after the constructor, but before it is rendered to the screen
  componentWillMount(){
    fetch(`${tmdb_url}movie/now_playing?api_key=${tmdb_api_key}&page=1`, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        nowPlaying : responseJson.results
      });
      this.getReview();
      this.getTVShows();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getTVShows(){
    fetch(`${tmdb_url}tv/popular?api_key=${tmdb_api_key}&page=1`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          tv : responseJson.results
        });
      })
      .catch((error) => {
        console.error(error);
      }); 
  }

  getReview(){
    let movie_id = this.state.nowPlaying[0].id;

    fetch(`${tmdb_url}movie/${movie_id}/reviews?api_key=${tmdb_api_key}&page=1`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          reviews : responseJson.results
        });
      })
      .catch((error) => {
        console.error(error);
      }); 
  }  

  renderReview(){
    let reviews = JSON.parse(JSON.stringify(this.state.reviews));
    reviews.length = 4;

    return reviews.map((movie) => (
      <div key={movie.id} className="card">
        <div className="poster"><img src={`${img_url}/w300${this.state.nowPlaying[0].poster_path}`} alt="poster"/></div>
        <div className="info">
          <strong>{movie.author}</strong>
          <p>{movie.content.substring(0, 198)}</p>
          <a>read more</a>
        </div>
      </div>
    ));
  }

  renderNowPlaying(){
    let movies = JSON.parse(JSON.stringify(this.state.nowPlaying));
    movies.length = 4;

    return movies.map((movie) => (
      <div key={movie.id} className="card">
        <div className="poster"><img src={`${img_url}/w300${movie.poster_path}`} alt="poster"/></div>
        <div className="info">
          <strong>{movie.title}</strong>
          <p>{movie.overview.substring(0, 198)}</p>
          <a>read more</a>
        </div>
      </div>
    ));
  }

  renderTVShows(){
    let tv = JSON.parse(JSON.stringify(this.state.tv));
    tv.length = 4;

    return tv.map((show, i) => (
      <div key={show.id} className="card">
        <div className="poster"><img src={i === 0 ? `${img_url}/w500${show.backdrop_path}` : `${img_url}/w300${show.backdrop_path}`}  alt="poster"/></div>
        <div className="info">
          <strong>{show.name}</strong>
          <p>{ i === 0 ? show.overview : show.overview.substring(0, 50)}</p>
          <a>read more</a>
        </div>
      </div>
    ));
  }

  renderSlides(){
      let movies = this.state.nowPlaying;
      movies.length = 4;
      let images = movies.map((movie) => {
          return movie.backdrop_path;
      });

      return images.map((img, i) => (
        <div className='red' style={{backgroundImage : `url(${img_url}w1280${img})`, backgroundSize : 'cover', backgroundPosition : 'top left'}} key={i}>
          <h2>{ movies[i].title }</h2>
        </div>
      ));
  }

  render(){
    return (
      <div className="home">
        {
          this.state.nowPlaying.length > 0 ? (
            <Carousel options={{ duration : 200, fullWidth: true, indicators : true }}>
              { this.renderSlides() }
            </Carousel>
          ) : null
        }

        <div className="tvShows">
          <div className="top">
            <i className="fa fa-film"></i>
            <h2>TV Shows</h2>
          </div> 
          <div className="content">
            {this.state.tv.length > 0 ? this.renderTVShows() : (
              <div className="preloader"><img src={require('../../img/loading_icon.gif')} alt="poster"/></div>
            )}
          </div>
        </div>

        <div className="inTheatre">
          <div className="top">
            <i className="fa fa-film"></i>
            <h2>In Theatres</h2>
          </div> 
          <div className="content">
            {this.state.nowPlaying.length > 0 ? this.renderNowPlaying() : (
              <div className="preloader"><img src={require('../../img/loading_icon.gif')} alt="poster"/></div>
            )}
          </div>
        </div>

        <div className="reviews">
          <div className="top">
            <i className="fa fa-film"></i>
            <h2>Reviews</h2>
          </div> 
          <div className="content">
            {this.state.nowPlaying.length > 0 ? this.renderReview() : (
              <div className="preloader"><img src={require('../../img/loading_icon.gif')} alt="poster"/></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;