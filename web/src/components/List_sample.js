import React, { Component } from 'react';

class List extends Component{
	constructor(){
		super();

		this.state = {
			characters : []
		};
	}

	componentWillMount(){
		fetch('https://rickandmortyapi.com/api/character/')
    .then((response) => response.json())
    .then((responseJson) => {
    	console.log(responseJson);
      this.setState({
      	characters : responseJson.results
      });
    })
    .catch((error) => {
      console.error(error);
    });
	}

	renderList(){
		return this.state.characters.map((character) => { 
			return (<div key={character.name}><span>{character.name}</span></div>)
		});
	}

	render(){
		return (
			<div className="list">
				{ this.state.characters && this.state.characters.length === 0 ? <p>No characters</p> : this.renderList()}
			</div>
		);
	}
}

export default List;