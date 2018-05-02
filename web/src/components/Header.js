import React, { Component } from 'react';
import { Navbar} from 'react-materialize';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component{
	constructor(props){
		super(props);

		this.state = {
			searchQuery : '',
			movies : []
		};
	}

	onSearchTextChange(e){
		this.setState({
			searchQuery : e.currentTarget.value
		});
	}

	search(){
		this.props.searchQuery(this.state.searchQuery);
	}

	render(){
		return (
			<div className="header">
				<div className="row">
					<Navbar brand="logo" right>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/discover">Discover</Link></li>
						<li><Link to="/movies">Movies</Link></li>
						<li><Link to="/shows">TV Shows</Link></li>
					</Navbar>
					<div className="signin">
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</div>
				</div>
				<div className="row">
					<a href="#search" onClick={ ()=> this.search() }><i className="fa fa-search"></i></a>
					<input type="search" className="search" onChange={ (e)=> this.onSearchTextChange(e) }/>
				</div>
			</div>
		);
	}
}

export default Header;