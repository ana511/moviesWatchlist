import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component{

	render(){
		return (
			<div className="footer">
				<div className="message">
					<strong>Message</strong>
					<p>To get in touch, leave us a message and we'll get back to you as soon as possible</p>
					<textarea></textarea>
					<a href="#send">Send</a>
				</div>
				<div className="legal">
					<strong>Legal</strong>
					<a href="#terms">Terms of Use</a>
					<a href="#privacy">Privacy Policy</a>
					<a href="#security">Security</a>
				</div>
				<div className="account">
					<strong>Account</strong>
					<a href="#account">My Account</a>
					<a href="#watchlist">Watchlist</a>
					<a href="#collections">Collections</a>
				</div>
			</div>
		);
	}
}

export default Footer;