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
// we need to use query to pass id and get relevant data
export const getBookInfo = gql`
	query($id: ID) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
		}
	}
`;
// by adding query variable next to mutation we can add values to data base
export const addBook = gql`
	mutation($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			genre
		}
	}
`;
