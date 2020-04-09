import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookList } from '../../queries/queries';
import BookInfo from '../BookInfo/BookInfo';

class BookList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedId: '',
		};
	}
	onBookClickedHandler = (selectedId) => {
		this.setState({ selectedId });
	};
	fetchBooks = () => {
		const {
			data: { loading, books },
		} = this.props;
		if (loading) {
			return <div className="loading">Loading Data ... </div>;
		} else {
			return books.map(({ name, id }) => (
				<li className="book" key={id} onClick={() => this.onBookClickedHandler(id)}>
					{name}
				</li>
			));
		}
	};
	render() {
		const { selectedId } = this.state;
		return (
			<div className="book-list-container">
				<ul className="book-list">{this.fetchBooks()}</ul>
				<BookInfo selectedBookId={selectedId} />
			</div>
		);
	}
}

export default graphql(getBookList)(BookList);
