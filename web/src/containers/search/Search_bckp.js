import React, { Component } from 'react';
import './Search.css';

class Search extends Component{
  constructor(props){
    super(props);

    this.state = {
      searchQuery : props.searchQuery,
      searchResults : []
    };
  }

  componentWillReceiveProps(newProps){
    this.setState({
      searchQuery : newProps.searchQuery
    });

    this.fetchData();
  }

  fetchData(){
    let tmdb_url = process.env.REACT_APP_TMDB_URL;
    let tmdb_api_key = process.env.REACT_APP_TMDB_API_KEY;

    if(this.state.queryString !== ''){
      fetch(`${tmdb_url}search/multi?api_key=${tmdb_api_key}&query=${this.state.searchQuery}&page=1`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          searchResults : responseJson.results
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  componentWillMount(){
    this.fetchData();
  }

  renderSingleResult(result){
    let img_url = process.env.REACT_APP_TMDB_IMAGE_URL;
    let currentScreen = '/search';

    if(result.media_type === 'tv'){
      return (
        <div key={result.id}>
          <div><img src={`${img_url}w185${result.poster_path}`} alt={result.name}/></div>
          <p>TV Show</p><br/>
          <div>
            <p>{result.first_air_date}</p>
            <p className="overview">{result.overview.substring(0, 285)} ...</p>
            <a href={`${currentScreen}/:${result.id}`}>read more</a>
          </div>
        </div>
      );
    }
    else if(result.media_type === 'movie'){
      return (
        <div key={result.id}>
          <div><img src={`${img_url}w185${result.poster_path}`} alt={result.title}/></div>
          <p>Movie</p><br/>
          <div>
            <p>{result.release_date}</p>
            <p className="overview">{result.overview.substring(0, 285)} ...</p>
            <a href={`${currentScreen}/:${result.id}`}>read more</a>
          </div>
        </div>
      );
    }
    else{
      return (
        <div key={result.name}>
          <div><img src={`${img_url}w185${result.profile_path}`} alt={result.name}/></div>
          <p>Person</p><br/>
          <p>Known for:</p>
          <div>
            { result.known_for.map((movie) => (<p key={movie.id}>{movie.title}</p>)) }
          </div>
        </div>
      );
    }
  }

  renderResults(){
    if(this.state.searchResults.length > 1){
      return this.state.searchResults.map((result) => {
        return this.renderSingleResult(result);
      });
    }
    else{
      return this.renderSingleResult(this.state.searchResults[0]);
    }
  }

  render(){
    return (
      <div className="search">
        <h1>Search</h1>
        {
          this.state.searchResults && this.state.searchResults.length > 0 ? (
            <div className="results"> {this.renderResults()} </div>
          ) : null
        }
      </div>
    );
  }
}

export default Search;