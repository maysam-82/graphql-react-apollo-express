import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthors } from '../../queries/queries';

class AddBook extends Component {
	fetchAuthors = () => {
		const {
			data: { loading, authors },
		} = this.props;
		if (loading) {
			return (
				<option className="option" disabled>
					Loading Data ...{' '}
				</option>
			);
		} else {
			return authors.map(({ name, id }) => (
				<option className="option" key={id} value={id}>
					{name}
				</option>
			));
		}
	};
	render() {
		return (
			<form className="add-book-form">
				<div className="form-control-container">
					<label className="label-control">Book Name:</label>
					<input type="text" className="input" />
				</div>
				<div className="form-control-container">
					<label className="label-control">Genre:</label>
					<input type="text" className="input" />
				</div>
				<div className="form-control-container">
					<label className="label-control">Author:</label>
					<select className="input-select">
						<option>Select Author</option>
						{this.fetchAuthors()}
					</select>
				</div>
				<button className="button-add">Add Book</button>
			</form>
		);
	}
}

export default graphql(getAuthors)(AddBook);
