import React, {Component} from 'react';
import './App.css';
import Searchbar from './Searchbar';
import Results from './Results';

class App extends Component {
	constructor(props) {
		super(props);

		// Set default state
		this.state = {
			results: null,
			history: []
		}
	}

	componentDidMount() {
		// Get history from localstorage
		let history = localStorage.getItem('history');

		// If there is a history
		if (history) {
			// Set the history to state
			this.setState({history: JSON.parse(history)});
		}
	}

	/**
	 * Set search results in state
	 * @param data
	 */
	searchResults = (data) => {
		this.setState({results: data});
	}

	/**
	 * Add item to history
	 * @param data
	 */
	addHistory = (data) => {
		// Get current history
		let history = this.state.history;

		// Add item to array
		history.unshift(data);

		// Remove duplicated
		history = this.removeDuplicated(history);

		// Save only 10 last items
		if (history.length >= 10) {
			history = history.slice(0, 10);
		}

		// Save history to state
		this.setState({'history': history});

		// Save history to localstorage
		localStorage.setItem('history', JSON.stringify(history));
	}

	/**
	 * Remove duplicate items from array
	 * @param array
	 * @returns {Array}
	 */
	removeDuplicated(array) {
		let uniqueList = new Set(array.map(e => JSON.stringify(e)));
		return Array.from(uniqueList).map(e => JSON.parse(e));
	}

	render() {
		return (
			<div className="container">
				<div className="logo">
					<h1><span>Pie<strong>sync</strong></span> company search</h1>
				</div>

				<Searchbar searchResults={this.searchResults}/>

				<Results clickedItem={this.addHistory} results={this.state.results}/>

				<h3 className="results__title">Previous visited companies</h3>
				<Results clickedItem={this.addHistory} results={this.state.history}/>
			</div>
		);
	}
}

export default App;
