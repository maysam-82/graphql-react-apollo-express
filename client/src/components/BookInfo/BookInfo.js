import React from 'react';
import { graphql } from 'react-apollo';
import { getBookInfo } from '../../queries/queries';

const BookInfo = () => {
	return (
		<div className="book-info-container">
			<p className="book-info-title">Book information: </p>
		</div>
	);
};

export default graphql(getBookInfo)(BookInfo);
