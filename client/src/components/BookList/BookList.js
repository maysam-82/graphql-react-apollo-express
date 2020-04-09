import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookList } from '../../queries/queries';

class BookList extends Component {
	fetchBooks = () => {
		const {
			data: { loading, books },
		} = this.props;
		if (loading) {
			return <div className="loading">Loading Data ... </div>;
		} else {
			return books.map(({ name, id }) => (
				<li className="book" key={id}>
					{name}
				</li>
			));
		}
	};
	render() {
		return (
			<div className="book-list-container">
				<ul className="book-list">{this.fetchBooks()}</ul>
			</div>
		);
	}
}

export default graphql(getBookList)(BookList);
