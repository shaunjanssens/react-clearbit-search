import React, {Component} from 'react';
import './Results.css';

class Results extends Component {
	/**
	 * Set clicked company to props of root element
	 * @param company
	 */
	addHistory(company) {
		this.props.clickedItem(company);
	}

	render() {
		let companyList = null;

		// Check if there are results
		if (this.props.results) {
			companyList = this.props.results.map((company) => {
				return (
					<li>
						<a className="results__result" href={ 'http://' + company.domain } target="_blank"
							 onClick={() => this.addHistory(company)}>
							<div className="results__logo">
								<img src={company.logo} alt=""/>
							</div>
							<div className="results__companyname">{company.name}</div>
							<div className="results__companywebsite">www.{company.domain}</div>
							<div className="results__icon"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></div>
						</a>
					</li>
				);
			});

			return (
				<div className="results">
					<ul className="results__list">
						{ companyList }
					</ul>
				</div>
			);
		} else {
			return (<div></div>);
		}
	}
}

export default Results;
