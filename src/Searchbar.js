import React, {Component} from 'react';
import './Searchbar.css';

class Searchbar extends Component {
	clearbitApiUrl = 'https://autocomplete.clearbit.com/v1/companies/suggest?query=';

	constructor(props) {
		super(props);

		this.state = {
			value: '',
			results: ''
		};

		// Bind event handlers
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/**
	 * When the form is submitted
	 * @param e
	 */
	handleSubmit(e) {
		e.preventDefault();

		const {value} = this.input;

		// Set value state
		this.setState({value: value});

		// Do nothing if there is no input
		if (value === '') {
			return;
		}

		// Call search function
		this.search(value).then((data) => {
			// Set the result to state and props of root element
			this.setState({results: data});
			this.props.searchResults(data);
		});
	}

	/**
	 * When there is a change
	 * @param e
	 */
	handleChange(e) {
		e.preventDefault();

		const {value} = this.input;

		// Set value state
		this.setState({value: value});

		// Check if input length is greater then 3
		if (value.length < 3) {
			// Remove results from state and props
			this.setState({results: ''});
			this.props.searchResults('');
			return;
		}

		// Call search function
		this.search(value).then((data) => {
			// Set the result to state and props of root element
			this.setState({results: data});
			this.props.searchResults(data);
		});
	}

	/**
	 * Search for companies
	 * @param query
	 * @returns {Promise.<TResult>}
	 */
	search(query) {
		// Buld url
		const url = this.clearbitApiUrl + query.toLowerCase();

		// Use Fetch() to get api results
		return fetch(url)
			.then((response) => {
				// Check if statuscode is 200
				if (response.status !== 200) {
					console.error('There was a problem, code: ', response.status);
					return false;
				}

				// Return data
				return response.json().then((data) => {
					return data;
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<div className="searchbar">
				<form onSubmit={this.handleSubmit}>
					<input className="searchbar__input" placeholder="Company name" ref={node => this.input = node}
								 value={this.state.value} onChange={this.handleChange}/>
					{this.state.results.length > 0 &&
					<span className="searchbar__resultcount">{this.state.results.length} results</span>
					}
					<button className="searchbar__button" type="submit"><i className="fa fa-search" aria-hidden="true"></i>
					</button>
				</form>
			</div>
		);
	}
}

export default Searchbar;
