import React from 'react';
import { graphql } from 'react-apollo';
import { getBookInfo } from '../../queries/queries';

const BookInfo = (props) => {
	const displayBookInfo = () => {
		const { book } = props.data;
		if (!book) {
			return <div className="loading">No book is selected. </div>;
		} else {
			const { name: bookName, genre, author } = book;
			const { age, name: authorName, books } = author;
			return (
				<div className="book-info-container">
					<p className="book-info-title">Selected book information: </p>
					<p>Name of Book: {bookName}</p>
					<p>Genre: {genre}</p>
					<p>Author: {authorName}</p>
					<p>age: {age}</p>
					<p>other books written by {authorName}</p>
					<ul className="list-of-books-by-author">
						{books.length !== 0
							? books.map(({ name, id }) => (
									<li className="book-by-author" key={id}>
										{name}
									</li>
							  ))
							: null}
					</ul>
				</div>
			);
		}
	};

	return <div className="book-info-container">{displayBookInfo()}</div>;
};
// pass props to get id as a variable and pass it to query
export default graphql(getBookInfo, {
	options: (props) => {
		return {
			variables: {
				id: props.selectedBookId,
			},
		};
	},
})(BookInfo);
