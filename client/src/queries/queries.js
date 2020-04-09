import { gql } from 'apollo-boost';

export const getAuthors = gql`
	{
		authors {
			name
			id
		}
	}
`;

export const getBookList = gql`
	{
		books {
			name
			id
		}
	}
`;

export const addBook = gql`
	mutation {
		addBook(name: "", genre: "", authorId: "") {
			name
			genre
		}
	}
`;
