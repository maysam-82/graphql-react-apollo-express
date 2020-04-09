import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getbookList = gql`
	{
		books {
			name
			id
		}
	}
`;
class BookList extends Component {
	render() {
		return (
			<div className="book-list-container">
				<ul className="book-list">
					<li>book name</li>
				</ul>
			</div>
		);
	}
}

export default graphql(getbookList)(BookList);
